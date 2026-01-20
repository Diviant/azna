
import { TattooStyle, PortfolioItem, MasterInfo, Review } from './types';

export const MASTER_INFO: MasterInfo = {
  name: "AZNA",
  bio: "Первоклассный татуаж с немецкой точностью. Специализируюсь на сложных проектах и премиальном сервисе. Твоя кожа заслуживает лучшего тюнинга.",
  experience: "8+ лет",
  avatar: "https://files.catbox.moe/o3d81z.jpg", // Твое фото (селфи)
  location: "г. Уфа, ул. Чернышевского, 88 (AZNA TATTOO)"
};

export const TELEGRAM_CHANNEL = "https://t.me/AZNATATTOO";

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: '1',
    style: TattooStyle.BLACKWORK,
    imageUrl: 'https://files.catbox.moe/p9p6m2.jpg', // Змея на плече
    description: 'Контрастная работа. Стилизованная змея и цветы.'
  },
  {
    id: '2',
    style: TattooStyle.FINELINE,
    imageUrl: 'https://files.catbox.moe/v08dqu.jpg', // Эскизы
    description: 'Авторские эскизы. Нептун и драккары.'
  },
  {
    id: '3',
    style: TattooStyle.FINELINE,
    imageUrl: 'https://files.catbox.moe/5m3l0b.jpg', // Змеи на груди
    description: 'Симметричная композиция на ключицах.'
  },
  {
    id: '4',
    style: TattooStyle.REALISM,
    imageUrl: 'https://files.catbox.moe/6v0p8j.jpg', // Спина
    description: 'Масштабный проект на всю спину.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Игорь М.',
    text: 'Как будто купил новую машину, только на всю жизнь. Уровень сервиса в Уфе просто топ — М-серия в мире тату.',
    rating: 5,
    date: '15.06.2024'
  },
  {
    id: '2',
    author: 'Кристина Л.',
    text: 'Тончайшие линии. Очень дорого выглядит, мастер в AZNA знает свое дело на все 100%.',
    rating: 5,
    date: '20.06.2024'
  },
  {
    id: '3',
    author: 'Алексей P.',
    text: 'Забиваюсь только у AZNA. Всегда четко, быстро и с характером. Лучший салон в Уфе.',
    rating: 5,
    date: '05.07.2024'
  }
];

export const BODY_AREAS = [
  'Предплечье', 'Плечо', 'Спина', 'Грудь', 'Бедро', 'Голень', 'Кисть', 'Шея', 'Живот'
];

export const TATTOO_SIZES = [
  'Маленькая (< 5см)', 'Средняя (5-15см)', 'Большая (15-30см)', 'Рукав / Спина'
];
