FROM python:3.11-alpine
RUN apk update && apk upgrade && apk add bash

ENV PYTHONUNBUFFERED 1
WORKDIR /django_info_person

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .