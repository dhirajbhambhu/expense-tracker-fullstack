# 💰 Expense Tracker — Full Stack

A full-stack expense tracking application built with **Spring Boot**, **React**, **MySQL**, and **JWT Authentication**. Users can securely register, log in, and (soon) manage their personal expenses through a protected dashboard.

**🔗 Live Demo:** [expense-tracker-fullstack-steel.vercel.app](https://expense-tracker-fullstack-steel.vercel.app/)
**📖 API Docs (Swagger):** [expense-tracker-fullstack-project-1.onrender.com/swagger-ui/index.html](https://expense-tracker-fullstack-project-1.onrender.com/swagger-ui/index.html)

---

## 🚀 Tech Stack

| Layer | Technologies |
|---|---|
| **Backend** | Java 21, Spring Boot, Spring Security, Spring Data JPA, JWT Authentication, BCrypt, Maven, Swagger (OpenAPI) |
| **Frontend** | React, React Router DOM, Axios, Tailwind CSS |
| **Database** | MySQL |
| **Auth Storage** | JWT stored in Local Storage |

---

## ✨ Features

### 🔐 Authentication & Security
- User registration & login
- JWT-based stateless authentication
- BCrypt password encryption
- Role-based access control (ADMIN / USER)
- Protected routes with auto-redirect after login
- Logout with token cleanup

### 💸 Expense Management
- Full CRUD for expenses
- Category-wise expense organization (create, update, delete categories)
- Monthly budget tracking (spent vs. remaining)

### 📊 Analytics & Reporting
- Monthly spending trend analytics
- Category-wise expense breakdown
- PDF / Excel export of expense reports
- Automated email alerts when monthly budget is exceeded

### ✅ Validation
- Client-side form validation (React)
- Backend validation (Spring Boot)
- Invalid login & duplicate user handling

### 🧪 Testing & DevOps
- 15+ unit tests across services using JUnit 5 + Mockito (happy paths, edge cases, exceptions)
- Dockerized backend
- CI/CD pipeline via GitHub Actions
- Backend deployed on Render, frontend deployed on Vercel

---

## 📂 Project Structure

**Backend**
expense-tracker/
├── controller
├── service
├── repository
├── model
├── security
├── config
└── dto

**Frontend**

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

---

## 🔐 Authentication Flow

Register → Save User in MySQL → Login → JWT Generated
→ Store Token in Local Storage → Protected Dashboard → Logout → Remove JWT

---

## 🛠 API Endpoints

> ⚠️ Endpoint paths below follow standard REST conventions based on the app's feature set — verify exact paths against [Swagger UI](https://expense-tracker-fullstack-project-1.onrender.com/swagger-ui/index.html) and adjust if they differ.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Authenticate user & return JWT |

### Expenses

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/expenses` | Get all expenses for logged-in user |
| `POST` | `/expenses` | Create a new expense |
| `PUT` | `/expenses/{id}` | Update an existing expense |
| `DELETE` | `/expenses/{id}` | Delete an expense |

### Categories

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/categories` | Get all categories |
| `POST` | `/categories` | Create a new category |
| `PUT` | `/categories/{id}` | Update a category |
| `DELETE` | `/categories/{id}` | Delete a category |

### Budget & Analytics

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/budget` | Get current month's budget vs. spending |
| `POST` | `/budget` | Set/update monthly budget |
| `GET` | `/analytics/monthly-trend` | Get monthly spending trend |
| `GET` | `/analytics/category-breakdown` | Get category-wise expense breakdown |
| `GET` | `/reports/export` | Export expense report as PDF/Excel |

Full interactive documentation available via [Swagger UI](https://expense-tracker-fullstack-project-1.onrender.com/swagger-ui/index.html).

---


## 📌 Upcoming Features
- [ ] Dashboard charts & data visualization
- [ ] Profile management
- [ ] Responsive UI improvements
- [ ] Multi-currency support

---

## ▶️ Run Locally

**Backend**
```bash
cd expense-tracker
mvn spring-boot:run
```

**Frontend**
```bash
cd expense-tracker-frontend
npm install
npm run dev
```

---

## 👨‍💻 Author

**Dhiraj Bhambhu**
GitHub: [@dhirajbhambhu](https://github.com/dhirajbhambhu)

