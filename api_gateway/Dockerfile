FROM openjdk:17.0.1-jdk-slim-buster

WORKDIR /app

COPY . /app

# If run on debug modo

CMD ["./mvnw", "spring-boot:run"]

# If run on production

# RUN ./mvnw clean package

# CMD ["java", "-jar", "target/api-gateway-0.0.1-SNAPSHOT.jar"]


EXPOSE 8080