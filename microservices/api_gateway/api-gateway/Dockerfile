FROM openjdk:17-jdk-alpine

WORKDIR /api_gateway

ARG JAR_FILE=build/libs/*.jar

COPY ./build/libs/*.jar ./api_gateway/app.jar

ENTRYPOINT ["java", "-jar", "api_gateway/app.jar"]