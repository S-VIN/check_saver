FROM python:latest

LABEL Maintainer="stepan-vinokurov"

WORKDIR /home

COPY main.py ./
COPY get.py ./
COPY model.py ./
COPY post.py ./
COPY router.py ./
COPY db_connector.py ./

# Устанавливаем зависимости
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

RUN rm -rf /etc/localtime
RUN ln -s /usr/share/zoneinfo/Europe/Moscow /etc/localtime
RUN echo "Europe/Moscow" > /etc/timezone

CMD ["fastapi", "run", "./main.py", "--port", "1200"]
