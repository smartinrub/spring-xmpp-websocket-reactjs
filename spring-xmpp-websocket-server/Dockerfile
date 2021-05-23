FROM openjdk:16-slim
RUN mkdir /app
RUN groupadd -r app && useradd -r -s /bin/false -g app app
WORKDIR /app
RUN mkdir temp
ADD /target/spring-xmpp-websocket-server-0.1.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
