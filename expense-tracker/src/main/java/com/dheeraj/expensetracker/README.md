# Expense Tracker Backend

A RESTful Expense Tracker API built using Spring Boot and MySQL. This project helps users manage expenses, categories, and authentication using JWT. It serves as the backend foundation for a full-stack expense tracking application.

---

## 🚀 Tech Stack

- Java 21
- Spring Boot
- Spring Data JPA
- Spring Security
- JWT (JJWT)
- Hibernate
- MySQL
- Lombok
- Maven
- Swagger (OpenAPI)

---

## 📁 Project Structure

```
src/main/java/com/dheeraj/expensetracker

├── controller
├── service
├── repository
├── entity
├── security
├── exception
├── config
└── dto
```

---

## ✅ Features Implemented

### 🔐 Authentication

- User Registration
- User Login
- BCrypt Password Encryption
- JWT Token Generation
- Public Auth APIs

### 💸 Expense Management

- Create Expense
- Get All Expenses
- Get Expense By ID
- Update Expense
- Delete Expense

### 📂 Category Management

- Create Category
- Get All Categories
- Get Category By ID
- Delete Category

### 🗄 Database

- MySQL Integration
- Hibernate ORM
- Auto Table Creation using JPA
- One-to-Many Relationship (User → Expenses)

---

## 📌 API Endpoints

### Authentication

#### Register User

POST `/auth/register`

Request Body

```json
{
  "name": "Dheeraj",
  "email": "dheeraj@gmail.com",
  "password": "123456"
}
```

---

#### Login User

POST `/auth/login`

Request Body

```json
{
  "email": "dheeraj@gmail.com",
  "password": "123456"
}
```

Response

```text
eyJhbGciOiJIUzI1NiJ9...
```

---

### Expense APIs

#### Create Expense

POST `/expenses`

```json
{
  "title": "Pizza",
  "amount": 250,
  "description": "Dominos Pizza"
}
```

---

#### Get All Expenses

GET `/expenses`

---

#### Get Expense By ID

GET `/expenses/{id}`

---

#### Update Expense

PUT `/expenses/{id}`

```json
{
  "title": "Burger",
  "amount": 300
}
```

---

#### Delete Expense

DELETE `/expenses/{id}`

---

### Category APIs

#### Create Category

POST `/category`

```json
{
  "name": "Food"
}
```

---

#### Get All Categories

GET `/category`

---

#### Get Category By ID

GET `/category/{id}`

---

#### Delete Category

DELETE `/category/{id}`

---

## 🗄 Database Schema

### User

| Field | Type |
|---------|------|
| id | Long |
| name | String |
| email | String |
| password | String |

---

### Expense

| Field | Type |
|---------|------|
| id | Long |
| title | String |
| amount | Double |
| description | String |
| date | LocalDate |

---

### Category

| Field | Type |
|---------|------|
| id | Long |
| name | String |

---

## 🔄 Relationships

```
User
  |
  | 1 ---- * 
  |
Expense

Category
  |
  | 1 ---- *
  |
Expense
```

---

## 🧪 Testing

All APIs tested successfully using Postman.

### Authentication

- Register API ✅
- Login API ✅
- BCrypt Password Encryption ✅
- JWT Token Generation ✅

### Expense APIs

- Create Expense ✅
- Get Expense By ID ✅
- Update Expense ✅
- Delete Expense ✅

### Category APIs

- Create Category ✅
- Get All Categories ✅
- Get Category By ID ✅
- Delete Category ✅

---

## 🔜 Upcoming Features

### Security

- JWT Validation
- JwtAuthenticationFilter
- Protected APIs

### Clean Architecture

- DTO Layer
- Validation
- Global Exception Handler

### Business Features

- Budget Feature
- Expense Analytics
- Custom Queries
- Pagination & Sorting

### Testing

- JUnit
- Mockito

### Deployment

- Docker
- AWS Deployment
- CI/CD with GitHub Actions

### Frontend

- React
- Axios
- React Router
- Chart.js Dashboard

---

## 👨‍💻 Author

**Dhiraj Bhambhu**

- GitHub: https://github.com/dhirajbhambhu
- LinkedIn: https://www.linkedin.com/in/dhiraj-bhambhu/

---

## 📈 Current Progress

```
Project Setup             ✅
Entities                  ✅
Relationships             ✅
Expense CRUD              ✅
Category CRUD             ✅
Register API              ✅
Login API                 ✅
BCrypt Password Encoder   ✅
JWT Token Generation      ✅

JWT Filter                🔜
Spring Security           🔜
DTO Layer                 🔜
Validation                🔜
Exception Handler         🔜
Budget Feature            🔜
Analytics                 🔜
Testing                   🔜
Deployment                🔜
React Frontend            🔜
```