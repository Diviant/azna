
-- База данных для AZNATATTOO PERFORMANCE SYSTEM

-- 1. Пользователи (Клиенты)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    telegram_id VARCHAR(50) UNIQUE NOT NULL,
    chat_id VARCHAR(50) NOT NULL,
    username VARCHAR(100),
    first_name VARCHAR(100),
    last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Записи на сеансы (Booking System)
CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'REJECTED', 'COMPLETED', 'CANCELLED');

CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    style VARCHAR(50) NOT NULL,
    size VARCHAR(50) NOT NULL,
    body_area VARCHAR(50) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    comment TEXT,
    status booking_status DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notified_24h BOOLEAN DEFAULT FALSE,
    notified_3h BOOLEAN DEFAULT FALSE
);

-- 3. Динамическое Портфолио (Admin Managed)
CREATE TABLE IF NOT EXISTS portfolio_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    style VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    is_main_page BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Обучение (Academy)
CREATE TYPE course_level AS ENUM ('Base', 'Pro', 'Elite');

CREATE TABLE IF NOT EXISTS education_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    price VARCHAR(50) NOT NULL,
    description TEXT,
    level course_level DEFAULT 'Base',
    features TEXT[] -- Массив преимуществ
);

-- 5. Отзывы (Reviews)
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author VARCHAR(100) NOT NULL,
    text TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    date DATE DEFAULT CURRENT_DATE
);

-- Индексы для ускорения поиска
CREATE INDEX idx_bookings_date ON bookings(appointment_date);
CREATE INDEX idx_users_tg_id ON users(telegram_id);
