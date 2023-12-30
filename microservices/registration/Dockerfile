FROM python:3.11-alpine

ENV PYTHONUNBUFFERED 1
WORKDIR /django_registration

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .