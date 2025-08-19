# Billing Software (Spring Boot + React)

A full-stack billing application with Spring Boot backend and React frontend, containerized with Docker.

## Prerequisites
- Docker Desktop installed
- Java 21 JDK (for local development)
- Node.js (for frontend development)

## Docker Commands

### 1. Build and Start Containers
```bash
docker-compose up -d --build

mysql -h 127.0.0.1 -P 3307 -u root -p

docker-compose down -v

push on the docker hub and then use image 

cd billingsoftware

docker build -t karanchile01/billing-software-backend:latest .

cd client

docker build -t karanchile01/billing-software-frontend:latest .

docker login -u karanchile01


docker push karanchile01/billing-software-backend:latest

docker push karanchile01/billing-software-frontend:latest

docker-compose down -v  

docker-compose up -d


clinet:-> http://localhost/
backend:-> http://localhost:8080/api/v1.0 
