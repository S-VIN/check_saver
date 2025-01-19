CREATE DATABASE check_saver;

-- Подключаемся к созданной БД
\c check_saver;

-- Создаем таблицу для покупок
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT,
    volume TEXT,
    brand TEXT,
    category TEXT);

CREATE TABLE purchases(
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    date DATE NOT NULL DEFAULT NOW(),
    price INTEGER CHECK (price > 0) NOT NULL,
    quantity INTEGER CHECK (quantity > 0) NOT NULL DEFAULT 1,
    shop TEXT NOT NULL,
    tags TEXT[]
);

CREATE TABLE checks(
    id SERIAL PRIMARY KEY,
    purchase_ids INTEGER[]
);