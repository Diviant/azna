
# AZNA PERFORMANCE: Full-Stack Architecture

## 1. API Endpoints (Node.js/Express)

### Client API
- `POST /api/users/sync`: Регистрация/обновление данных пользователя из Telegram.
- `GET /api/portfolio`: Получение списка работ (совмещение статики и БД).
- `POST /api/bookings`: Создание новой заявки.
- `GET /api/education`: Список актуальных курсов.

### Admin API (Protected by M-Code/JWT)
- `GET /api/admin/bookings`: Список всех заявок для CRM.
- `PATCH /api/admin/bookings/:id`: Изменение статуса (Confirm/Reject).
- `POST /api/admin/portfolio`: Загрузка новой работы.
- `DELETE /api/admin/portfolio/:id`: Удаление работы.
- `PUT /api/admin/education`: Редактирование цен/программ обучения.

## 2. Integration Logic

### Когда клиент бронирует (BookingView.tsx -> API):
1. Запись падает в таблицу `bookings`.
2. Бот мгновенно отправляет сообщение Мастеру (тебе): 
   *"⚡️ НОВАЯ ЗАЯВКА: Реализм, Рукав, 24.10 в 14:00. Клиент: @username"*
3. Бот отправляет клиенту: *"Принято! Мастер проверит график и подтвердит запись."*

### Когда админ подтверждает (AdminView.tsx -> API):
1. Статус меняется на `CONFIRMED`.
2. Бот пишет клиенту: *"🔥 Мастер подтвердил твою запись! Ждем тебя 24.10 в 14:00. Локация: Уфа, Чернышевского 88."*

## 3. Deployment Flow (Vercel + Railway)

1. **Frontend**: Деплоится на Vercel (подхватывает `vercel.json`).
2. **Backend**: Рекомендую **Railway.app** — там можно поднять Node.js + PostgreSQL в один клик.
3. **Env Variables**:
   - `DATABASE_URL`: Строка подключения к базе.
   - `BOT_TOKEN`: От BotFather.
   - `ADMIN_SECRET`: Твой пин-код для API.

## 4. SQL Functions for Performance
Для автоматических напоминаний используй `pg-boss` или простую функцию в Node.js:
```javascript
// Напоминалка за 24 часа
const notifyUsers = async () => {
  const tomorrow = getTomorrowDate();
  const bookings = await db.query('SELECT * FROM bookings WHERE appointment_date = $1 AND notified_24h = false', [tomorrow]);
  for (const b of bookings) {
    await bot.api.sendMessage(b.chatId, "⚠️ Напоминание: Завтра твой сеанс тюнинга в AZNA!");
    await db.query('UPDATE bookings SET notified_24h = true WHERE id = $1', [b.id]);
  }
}
```
