FROM openjdk:17-jdk-alpine

WORKDIR /eureka_server

ARG JAR_FILE=build/libs/*.jar

COPY ./build/libs/*.jar ./eureka_server/app.jar

ENTRYPOINT ["java", "-jar", "eureka_server/app.jar"]