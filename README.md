# 🍱 Food Sharing Website

A fully responsive MERN stack application that lets users donate and request food to help reduce waste and support the community. This project demonstrates full-stack CRUD operations, authentication, secure backend APIs, and a polished UI suitable for showcasing to recruiters.

---

## 🚀 Live Site

🔗 [FoodFully](https://foodgully.netlify.app/)

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

## 📦 Dependencies

**Frontend**
```
"react": "^19.1.0",
"react-router-dom": "^7.7.0",
"firebase": "^11.10.0",
"@tanstack/react-query": "^5.83.0",
"axios": "^1.10.0",
"framer-motion": "^12.23.6",
"react-icons": "^5.5.0",
"sweetalert2": "^11.6.13",
"tailwindcss": "^4.1.11"
```

---

## 🗂️ Folder Structure

```
client/
┣ 📂assets
┃ ┗ 📜Loading.json
┣ 📂Components
┃ ┣ 📜Banner.jsx
┃ ┣ 📜CountUpCard.jsx
┃ ┣ 📜FeaturedSection.jsx
┃ ┣ 📜FoodDetails.jsx
┃ ┣ 📜Navbar.jsx
┃ ┗ 📜ShortQuotes.jsx
┣ 📂Firebase
┃ ┗ 📜Firebase.config.js
┣ 📂Hooks
┃ ┗ 📜AxiosSecure.jsx
┣ 📂Pages
┃ ┣ 📜AddFood.jsx
┃ ┣ 📜AvailableFoods.jsx
┃ ┣ 📜FoodDetails.jsx
┃ ┣ 📜FoodRequestModal.jsx
┃ ┣ 📜Home.jsx
┃ ┣ 📜Loading.jsx
┃ ┣ 📜Login.jsx
┃ ┣ 📜ManageFoods.jsx
┃ ┣ 📜MyRequest.jsx
┃ ┣ 📜NotFound.jsx
┃ ┣ 📜Register.jsx
┃ ┗ 📜UpdateFoodModal.jsx
┣ 📂Providers
┃ ┣ 📜AuthContext.jsx
┃ ┗ 📜AuthProvider.jsx
┣ 📂Routes
┃ ┣ 📜MainRoutes.jsx
┃ ┗ 📜PrivateRoutes.jsx
┣ 📜App.css
┣ 📜App.jsx
┣ 📜index.css
┗ 📜main.jsx

server/
┣ 📜.env
┣ 📜.gitignore
┣ 📜admin-key.json
┣ 📜index.js
┣ 📜keyConvert.js
┣ 📜package.json
┗ 📜vercel.json

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

![Food Gully](https://github.com/user-attachments/assets/2b629ef3-3d78-4e87-813c-cab2a11cd912)

---

## 🏁 Deployment Checklist

- ✅ Server deployed without CORS/404/504 errors
- ✅ Firebase domain authorized (e.g., Netlify)
- ✅ Reloading any route doesn’t break auth
- ✅ Private routes don’t redirect to login after reload

---

## 🤝 Contribution

If you'd like to collaborate, feel free to fork and submit pull requests!

---

## ⚙️ Local Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<your-username>/food-gully.git
cd food-gully
```

### 2️⃣ Client Setup
```bash
cd client
npm install
npm run dev    # Runs on http://localhost:5173
```

### 3️⃣ Server Setup
```bash
cd ../server
npm install
# Create a .env file (see below)
npm run dev    # or node index.js (default port: 5000)
```

### 4️⃣ .env.example
```env
# MongoDB
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_jwt_secret

# Firebase
FIREBASE_PROJECT_ID=xxxx
FIREBASE_CLIENT_EMAIL=xxxx@xxxx.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nXXXX\n-----END PRIVATE KEY-----\n"

# Stripe (if using payments)
STRIPE_SECRET_KEY=sk_test_xxx
```

### 5️⃣ Security Guidelines
- Add `.env` and `admin-key.json` to `.gitignore`
- **Never commit sensitive credentials**
- Use environment variables in production

### 🏁 Deployment
- **Frontend:** Deploy to [Netlify](https://www.netlify.com/)  
- **Backend:** Deploy to [Vercel](https://vercel.com/) → configure `.env` in the hosting dashboard  
- **Firebase Auth:** Add your deployed domain(s) to the Firebase whitelist  

---
✅ **Pro Tip:** Keep your `.env` file local and secure. Use `.env.example` for collaborators so they know which keys are required.


## 🔒 License

MIT © 2025 Mohammad Al-Amin

---

> "One meal at a time — we fight waste and feed hope."
