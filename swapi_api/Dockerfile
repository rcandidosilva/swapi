# Stage 1: Gradle Build
FROM gradle:8.14 AS builder

WORKDIR /app
COPY . .
RUN ./gradlew bootJar -Pprod

# Stage 1: Final image
FROM alpine/java:21-jdk

WORKDIR /app
COPY --from=builder /app/build/libs/swapi-api-0.0.1-SNAPSHOT.jar swapi-api.jar

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/app/swapi-api.jar"]
