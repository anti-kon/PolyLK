FROM openjdk:17-jdk-alpine
RUN apk update && apk add bash

WORKDIR /api_gateway

ARG JAR_FILE=build/libs/*.jar

COPY ./build/libs/*.jar ./api_gateway/app.jar
ADD wait-for-it.sh ./api_gateway/