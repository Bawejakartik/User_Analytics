# 📊 User Analytics Application

> A Full-Stack Analytics Platform for Tracking User Behavior and Visualizing Engagement Metrics

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/Framework-Express-black)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🚀 Project Overview

This project was developed as part of the **CausalFunnel Full Stack Engineer Assignment**.

The application provides a lightweight analytics system capable of tracking user interactions on a webpage and displaying actionable insights through a centralized dashboard.

The system captures user events such as page visits and button clicks, stores them in a database, and presents aggregated analytics for monitoring user engagement.

### 🎯 Objectives

* Track user interactions in real-time
* Generate unique user sessions
* Store analytics events efficiently
* Visualize engagement metrics through a dashboard
* Demonstrate end-to-end full-stack development skills

---

## ✨ Features

### 🔍 Event Tracking

The tracking script automatically records:

✅ Page Views

✅ Button Clicks

✅ Session Information

✅ Event Timestamps

✅ Browser Activity

---

### ⚙️ Backend Analytics Engine

* RESTful API Architecture
* Event Collection Endpoint
* Session Management
* Analytics Aggregation
* MongoDB Data Persistence
* Error Handling & Validation

---

### 📈 Analytics Dashboard

The dashboard provides:

📊 Total Sessions

📊 Total Events

📊 Page View Analytics

📊 Click Analytics

📊 Recent User Activity

📊 Session-wise Tracking

---

## 🏗️ System Architecture

```text
User Browser
      │
      ▼
Tracking Script (tracking.js)
      │
      ▼
Analytics API (Node.js + Express)
      │
      ▼
MongoDB Database
      │
      ▼
Dashboard (React)
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose           |
| ---------- | ----------------- |
| React.js   | User Interface    |
| Axios      | API Communication |
| CSS        | Styling           |

### Backend

| Technology | Purpose             |
| ---------- | ------------------- |
| Node.js    | Runtime Environment |
| Express.js | API Development     |

### Database

| Technology | Purpose      |
| ---------- | ------------ |
| MongoDB    | Data Storage |
| Mongoose   | ODM          |

---

## 📂 Project Structure

```bash
User-Analytics-App/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
├── tracking.js
├── README.md
└── package.json
```

---

## ⚡ Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Bawejakartik/User_Analytics
```

```bash
cd user_analytics
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env`

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
```

Run Backend

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔌 API Endpoints

### Track User Event

```http
POST /api/events
```

Example Request

```json
{
  "sessionId": "session_123",
  "eventType": "click",
  "page": "/home",
  "timestamp": "2026-06-23T12:00:00Z"
}
```

---

### Get Analytics Statistics

```http
GET /api/stats
```

---

### Get All Sessions

```http
GET /api/sessions
```

---

## 🧠 How Tracking Works

### Step 1

User opens the webpage.

⬇️

### Step 2

`tracking.js` generates or retrieves a session ID.

⬇️

### Step 3

User performs an action:

* Click Button
* Visit Page

⬇️

### Step 4

Tracking script sends event data to backend API.

⬇️

### Step 5

Backend stores analytics in MongoDB.

⬇️

### Step 6

Dashboard fetches analytics and displays insights.

---


## 🔮 Future Enhancements

* 📡 Real-Time Analytics
* 📊 Advanced Charts
* 🔐 Authentication & Authorization
* 🗺️ User Journey Mapping
* 🔔 Event Notifications
* 📈 Traffic Source Analytics

---

## 🎥 Demo

### Live Application

[https://user-analytics-eight.vercel.app/]
 demo page Link - [https://user-analytics-1-vts3.onrender.com/demo]

### Demo Video

[https://drive.google.com/file/d/1MSlKNZdZXbRTgnDDCjy0GACEog6BR7ck/view?usp=sharing]

---

## 👨‍💻 Author

**Kartik Baweja**

💼 Full Stack Developer

📚 B.Tech CSE

🔗 GitHub: https://github.com/Bawejakartik

---

## 🙏 Acknowledgements

Special thanks to **CausalFunnel** for providing this assignment and opportunity to demonstrate full-stack engineering skills.
