# Expense Tracker Backend

A RESTful Expense Tracker API built using Spring Boot and MySQL. This project helps users manage expenses and categories through CRUD operations and serves as the backend foundation for a full-stack expense tracking application.

## 🚀 Tech Stack

* Java 21
* Spring Boot
* Spring Data JPA
* Hibernate
* MySQL
* Lombok
* Maven

## 📁 Project Structure

src/main/java/com/dheeraj/expensetracker

├── controller

├── service

├── repository

├── entity

├── security

├── exception

├── config

└── dto

## ✅ Features Implemented

### Expense Management

* Create Expense
* Get All Expenses
* Get Expense By ID
* Update Expense
* Delete Expense

### Category Management

* Create Category
* Get All Categories
* Get Category By ID
* Delete Category

### Database

* MySQL Integration
* Hibernate ORM
* Auto Table Creation using JPA
* User ↔ Expense Relationship
* One User → Many Expenses
* Many Expenses → One User
* Infinite Recursion Prevention using `@JsonIgnore`

## 📌 API Endpoints

### Expense APIs

#### Create Expense

POST /expenses

Request Body:

```json
{
  "title": "Pizza",
  "amount": 250,
  "description": "Dominos Pizza"
}
```

#### Get All Expenses

GET /expenses

#### Get Expense By ID

GET /expenses/{id}

#### Update Expense

PUT /expenses/{id}

```json
{
  "title": "Burger",
  "amount": 300
}
```

#### Delete Expense

DELETE /expenses/{id}

---

### Category APIs

#### Create Category

POST /category

Request Body:

```json
{
  "name": "Food"
}
```

#### Get All Categories

GET /category

#### Get Category By ID

GET /category/{id}

#### Delete Category

DELETE /category/{id}

## 🗄️ Database Schema

### Expense

| Field       | Type      |
| ----------- | --------- |
| id          | Long      |
| title       | String    |
| amount      | Double    |
| description | String    |
| date        | LocalDate |

### Category

| Field | Type   |
| ----- | ------ |
| id    | Long   |
| name  | String |

### User

| Field    | Type    |
| -------- | ------- |
| id       | Long    |
| name     | String  |
| age      | Integer |
| city     | String  |
| mobileNo | String  |

## 🧪 Testing

All APIs tested successfully using Postman.

### Expense APIs

* Create Expense ✅
* Get All Expenses ✅
* Get Expense By ID ✅
* Update Expense ✅
* Delete Expense ✅

### Category APIs

* Create Category ✅
* Get All Categories ✅
* Get Category By ID ✅
* Delete Category ✅

## 🔜 Upcoming Features

* Register API
* Login API
* BCrypt Password Encoding
* JWT Authentication
* Spring Security
* DTO Layer
* Validation
* Global Exception Handler
* Budget Feature
* Expense Analytics
* Unit Testing
* AWS Deployment
* React Frontend
* Docker
* CI/CD

## 👨‍💻 Author

Dhiraj Bhambhu

* GitHub: https://github.com/dhirajbhambhu
* LinkedIn: https://www.linkedin.com/in/dhiraj-bhambhu/

