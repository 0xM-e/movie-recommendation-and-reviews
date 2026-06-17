# 🎬 MoviVibe

A full-stack movie platform with authentication, reviews, and real-time movie data powered by TMDb API.

---

## 📌 About

MoviVibe is a full-stack web application built to demonstrate real-world development skills including authentication, REST API design, database modeling, and external API integration.

Users can discover movies, leave reviews, rate films, and interact with community-driven rankings.

---

## ✨ Features

- 🔐 Secure JWT authentication with protected routes
- 🎥 Real-time movie search via TMDb API
- ⭐ User-driven rating & review system
- 📊 Dynamic ranking system (daily / weekly / top-rated)
- 👤 Personalized user profiles with activity tracking

---

## 🧰 Tech Stack

Frontend:
- React (Vite)
- Redux Toolkit
- React Router
- Axios

Backend:
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

---

## ⚙️ Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm start
```

---

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables
```
MONGO_URI=
PORT=5000
CORS_ORIGIN=http://localhost:5173

TMDB_API_KEY=
TMDB_API_URL=

JWT_SECRET=

```
---

## 🚀 Usage

1. Register or login
2. Search movies
3. View details
4. Write and rate reviews
5. Interact with community ratings

---

## 📌 Project Goal

This project was built to demonstrate:

- Production-style full-stack architecture
- Secure authentication flows (JWT + bcrypt)
- REST API design best practices
- External API integration (TMDb)
- Scalable MongoDB schema design
- Modern React state management patterns

---

## 📄 License

This project is for portfolio/demo purposes.
