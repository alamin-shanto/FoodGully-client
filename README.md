# 🍱 Food Sharing Website

A fully responsive MERN stack application that lets users donate and request food to help reduce waste and support the community. This project demonstrates full-stack CRUD operations, authentication, secure backend APIs, and a polished UI suitable for showcasing to recruiters.

---

## 🚀 Live Site

🔗 [Visit Live Website]([https://.com](https://foodgully.netlify.app/)

---

![Food Gully](https://github.com/user-attachments/assets/2b629ef3-3d78-4e87-813c-cab2a11cd912)

---

## 🎯 Purpose

To build a real-world web application focused on social good while mastering full-stack development, including:

- CRUD operations (Create, Read, Update, Delete)
- Protected routes using Firebase & JWT
- RESTful API with Express & MongoDB
- Deployment (Netlify + Render/Vercel)

---

## ✨ Key Features

### 🧾 User Features

- Register/Login using Email & Google
- Add food (private route)
- View all available foods
- Request food via modal
- View/manage requested foods

### 👨‍🍳 Donor Features

- Manage foods added by them (update/delete)
- Food status auto-changes to "requested" upon request

### 🔎 Available Foods Page

- Sort by expire date
- Search by food name
- Toggle 3-column / 2-column layout

### 💡 Extras

- Responsive design (mobile/tablet/desktop)
- Eye-pleasing UI with Tailwind + Framer Motion
- Firebase keys, MongoDB URI securely managed in .env

---

## 🔐 Authentication

- Firebase (Email/Password, Google)
- JWT used for backend route protection
- Private routes don't redirect on reload

---

## 🧠 Technologies & Packages

### Client

- React + React Router DOM
- Firebase Auth
- Axios + AxiosSecure Hook
- TanStack React Query
- SweetAlert2
- Tailwind CSS + DaisyUI
- Framer Motion

### Server

- Express.js
- MongoDB Atlas
- Firebase Admin SDK (verify token)
- dotenv
- CORS

---

## 🗂️ Folder Structure

```
client/
├── src/
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   ├── providers/
│   ├── App.jsx
│   └── main.jsx

server/
├── server.js
├── .env
└── admin-key.json (secured)
```

---

## ✅ Commit Standards

- 📦 **Client:** 15+ meaningful commits
- 🔧 **Server:** 8+ meaningful commits

Example commit messages:

- "✨ Implement AddFood form with validation"
- "🔐 Protect API with Firebase JWT middleware"
- "🎨 Add Framer Motion animation to banner"

---

## 📸 Screenshots

_Add screenshots of UI sections like Home, Available Foods, Login, Add Food, etc._

---

## 🏁 Deployment Checklist

- ✅ Server deployed without CORS/404/504 errors
- ✅ Firebase domain authorized (e.g., Netlify)
- ✅ Reloading any route doesn’t break auth
- ✅ Private routes don’t redirect to login after reload

---

## 🤝 Contribution

This project is for personal learning and portfolio showcase. If you'd like to collaborate, feel free to fork and submit pull requests!

---

## 🔒 License

MIT © 2025 Mohammad Al-Amin

---

> "One meal at a time — we fight waste and feed hope."
