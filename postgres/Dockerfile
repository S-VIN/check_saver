# Используем официальный образ PostgreSQL
FROM postgres:latest

# Переменные окружения для настройки базы данных
ENV POSTGRES_DB check_saver
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres

# Копируем скрипты миграции в контейнер
COPY init.sql /docker-entrypoint-initdb.d/