FROM python:3.8.3-alpine

WORKDIR /app
ADD ./coderoom-backend/requirements.txt /app/coderoom-backend/

RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r coderoom-backend/requirements.txt

ADD ./docker /app/docker
ADD ./coderoom-backend /app/coderoom-backend