FROM python:3.11-alpine
RUN apk update && apk add bash

ENV PYTHONUNBUFFERED 1
WORKDIR /django_queues

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .