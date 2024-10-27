# Используем официальный образ PostgreSQL
FROM postgres:latest

# Переменные окружения для настройки базы данных
ENV POSTGRES_DB check_saver
ENV POSTGRES_USER stepan-vinokurov
ENV POSTGRES_PASSWORD stepan-vinokurov

# Копируем скрипты миграции в контейнер
COPY init.sql /docker-entrypoint-initdb.d/