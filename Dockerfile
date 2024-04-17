# Step 1: Building the Angular app
FROM node:14.2 AS ng-builder

RUN npm i -g @angular/cli@10.0.8

WORKDIR /ngapp

COPY frontend/package*.json .
COPY frontend/angular.json .
COPY frontend/tsconfig.* .
COPY frontend/src src

RUN npm ci --force && ng build

# Step 2: Building the Spring Boot app
FROM maven:3-eclipse-temurin-21 AS sb-builder

WORKDIR /sbapp

COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn
COPY backend/src src
COPY backend/pom.xml .

# Ensure the Angular build artifacts are copied correctly
# Check the structure in your dist folder after Angular builds to adjust the path if necessary
COPY --from=ng-builder /ngapp/dist/* /sbapp/src/main/resources/static/

RUN mvn package -Dmaven.test.skip=true

# Step 3: Setting up the production environment
FROM openjdk:21-jdk-slim

WORKDIR /app

COPY --from=sb-builder /sbapp/target/backend-0.0.1-SNAPSHOT.jar app.jar

ENV SPRING_DATASOURCE_URL=
ENV SPRING_DATA_REDIS_HOST=
ENV SPRING_DATA_REDIS_PASSWORD=
ENV SPRING_DATA_REDIS_PORT=
ENV SPRING_DATA_REDIS_SSL_ENABLE=

ENV SPRING_MAIL_HOST=
ENV SPRING_MAIL_PASSWORD=
ENV SPRING_MAIL_PORT=
ENV SPRING_MAIL_USERNAME=
ENV API_KEY=

ENV PORT=8080

EXPOSE ${PORT}

# Adjust the ENTRYPOINT command to set the server port correctly
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
