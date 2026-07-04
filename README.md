# 💰 Expense Tracker (Full Stack)

A full-stack Expense Tracker application built using **Spring Boot**, **React**, **MySQL**, and **JWT Authentication**. The project allows users to register, log in securely, and manage their expenses.

---

## 🚀 Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication
- BCrypt Password Encryption
- MySQL
- Maven
- Swagger (OpenAPI)

### Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS
- Local Storage (JWT)

---

## ✨ Features

### Authentication
- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ BCrypt Password Encryption
- ✅ Protected Routes
- ✅ Logout
- ✅ Automatic Redirect after Login
- ✅ Token stored in Local Storage

### Validation
- ✅ Client-side Form Validation
- ✅ Backend Validation
- ✅ Invalid Login Handling
- ✅ Duplicate User Handling

---

## 📂 Project Structure

### Backend

```
expense-tracker/
├── controller
├── service
├── repository
├── model
├── security
├── config
└── dto
```

### Frontend

```
expense-tracker-frontend/
├── src
│   ├── pages
│   │   ├── Login
│   │   ├── Register
│   │   └── Dashboard
│   ├── components
│   │   └── ProtectedRoute
│   ├── routes
│   └── services
```

---

## 🔐 Authentication Flow

```
Register
      │
      ▼
Save User in MySQL
      │
      ▼
Login
      │
      ▼
JWT Generated
      │
      ▼
Store Token in Local Storage
      │
      ▼
Protected Dashboard
      │
      ▼
Logout
      │
      ▼
Remove JWT
```

---

## 📸 Current Screens

- Login Page
- Register Page
- Dashboard
- Protected Routes

---

## 🛠 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Register User |
| POST | `/auth/login` | Login User |

---

## 📌 Upcoming Features

- Expense CRUD
- Category CRUD
- Dashboard Statistics
- Charts
- Budget Management
- Reports
- Profile Management
- Responsive UI Improvements

---

## ▶️ Run Locally

### Backend

```bash
mvn spring-boot:run
```

### Frontend

```bash
npm install
npm run dev
```

---

## 📖 API Documentation

Swagger UI

```
https://expense-tracker-fullstack-project-1.onrender.com/swagger-ui/index.html
```

---

## 👨‍💻 Author

**Dhiraj Bhambhu**

GitHub:
https://github.com/dhirajbhambhu

