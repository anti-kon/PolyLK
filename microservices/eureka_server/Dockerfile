FROM openjdk:17-jdk-alpine

WORKDIR /eureka_server

ARG JAR_FILE=build/libs/*.jar

COPY ./build*/libs/*.jar ./eureka_server/app.jar

ENTRYPOINT ["/bin/sh", "-c", "${POLYLK_EUREKA_SERVER_START} && java -jar eureka_server/app.jar"]