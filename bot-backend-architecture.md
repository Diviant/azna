
# InkFlow Backend & Bot Architecture

To complement the Mini App, you need a Node.js backend to handle database storage, Telegram Bot interactions, and scheduled reminders.

## 1. Stack Recommendation
- **Backend**: Node.js with `grammy` (highly performant Telegram bot framework).
- **Database**: PostgreSQL with `Prisma` ORM.
- **Scheduling**: `node-cron` or `bullmq` (if using Redis).
- **Hosting**: Heroku, Railway, or a VPS (DigitalOcean).

## 2. Database Schema (Prisma Example)
```prisma
model User {
  id         Int       @id @default(autoincrement())
  telegramId String    @unique
  username   String?
  chatId     String    // Essential for sending reminders
  bookings   Booking[]
}

model Booking {
  id         String   @id @default(cuid())
  userId     Int
  user       User     @relation(fields: [userId], references: [id])
  style      String
  bodyArea   String
  dateTime   DateTime
  status     String   @default("PENDING") // PENDING, CONFIRMED, CANCELLED, COMPLETED
  notified24 Boolean  @default(false)
  notified3  Boolean  @default(false)
}
```

## 3. Bot Logic (GrammY)
```typescript
import { Bot } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN);

// Save user info and chat ID
bot.command("start", async (ctx) => {
  await db.user.upsert({
    where: { telegramId: ctx.from.id.toString() },
    update: { chatId: ctx.chat.id.toString() },
    create: { 
      telegramId: ctx.from.id.toString(),
      chatId: ctx.chat.id.toString(),
      username: ctx.from.username 
    }
  });
  
  await ctx.reply("Welcome to InkFlow! 🎨\n\nYour chat is now linked. You will receive notifications about your tattoo sessions here.", {
    reply_markup: {
      inline_keyboard: [[{ text: "Open Mini App", web_app: { url: "https://your-app.url" } }]]
    }
  });
});
```

## 4. Reminder Logic (Cron Job)
```typescript
import cron from 'node-cron';

// Run every hour
cron.schedule('0 * * * *', async () => {
  const now = new Date();
  
  // 1. Find sessions in 24 hours
  const target24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const bookings24 = await db.booking.findMany({
    where: { dateTime: { lte: target24h }, notified24: false, status: 'CONFIRMED' },
    include: { user: true }
  });

  for (const b of bookings24) {
    try {
      await bot.api.sendMessage(b.user.chatId, `Reminder: Your tattoo session is tomorrow at ${format(b.dateTime, 'HH:mm')}! See you there.`);
      await db.booking.update({ where: { id: b.id }, data: { notified24: true } });
    } catch (e) { console.error("User blocked bot", b.user.chatId); }
  }

  // 2. Similar logic for 3-hour reminders...
});
```

## 5. Security Checklist
- Validate `Telegram WebApp initData` on the backend to ensure requests are actually from the Telegram Mini App user.
- Use environment variables for all secrets.
- Enable HTTPS (required for Telegram Mini Apps).
