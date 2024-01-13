FROM openjdk:17-jdk-alpine

WORKDIR /eureka-server

ARG JAR_FILE=build/libs/*.jar

COPY ./build/libs/*.jar ./eureka-server/app.jar

ENTRYPOINT ["java", "-jar", "eureka-server/app.jar"]