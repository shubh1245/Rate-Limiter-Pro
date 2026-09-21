# 🚀 RateLimiter Pro

A production-ready API Security & Traffic Analytics Platform built using React, Node.js, Express, MongoDB, Redis, JWT Authentication, and Socket.IO.

RateLimiter Pro helps developers secure APIs, manage API keys, enforce rate limits, and monitor traffic with real-time analytics.

---

## ✨ Features

### 🔐 Authentication
- User Registration
- JWT Authentication
- Login System
- Email Verification (OTP)
- Resend OTP
- Forgot Password
- Reset Password
- Password Hashing using bcrypt

### 🔑 API Key Management
- Generate API Keys
- Delete API Keys
- API Key Validation
- Custom Rate Limits
- Custom Time Windows

### ⚡ Rate Limiting
- Redis-Based Rate Limiting
- Request Tracking
- Automatic Request Blocking
- Window-Based Limiting
- High Performance Request Handling

### 📊 Analytics Dashboard
- Total Requests
- Successful Requests
- Blocked Requests
- Daily Traffic Analytics
- Endpoint Analytics
- API Key Analytics
- Request Logs
- Top API Keys

### 📡 Real-Time Monitoring
- Socket.IO Integration
- Live Dashboard Updates
- Real-Time Traffic Tracking

### 🎨 Modern UI
- React + Vite
- Tailwind CSS
- Responsive Dashboard
- SaaS Inspired Design

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Recharts

## Backend
- Node.js
- Express.js
- JWT
- bcryptjs
- Nodemailer
- Socket.IO

## Database
- MongoDB Atlas
- Mongoose

## Caching & Rate Limiting
- Redis
- Redis Cloud

---

# 📂 Project Structure

```bash
RateLimiter-Pro
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── socket
│   ├── utils
│   └── server.js
│
└── README.md
```

---

# 🔄 Application Flow

## User Authentication

```text
Register
   ↓
Email Verification OTP
   ↓
Verify Account
   ↓
Login
   ↓
Dashboard
```

## Forgot Password

```text
Forgot Password
      ↓
Send OTP
      ↓
Verify OTP
      ↓
Reset Password
      ↓
Login
```

## API Request Flow

```text
Client Request
      ↓
API Key Validation
      ↓
Rate Limiter Check
      ↓
Allow / Block Request
      ↓
Store Request Log
      ↓
Update Analytics
      ↓
Return Response
```

---

# 📊 Dashboard Metrics

### Summary Cards
- Total Requests
- Successful Requests
- Blocked Requests

### Analytics
- Daily Traffic
- Top API Keys
- Endpoint Analytics
- Request Logs
- API Key Performance

---

# 🔐 Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

EMAIL_USER=YOUR_GMAIL

EMAIL_PASS=YOUR_APP_PASSWORD

REDIS_URL=YOUR_REDIS_URL
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/RateLimiter-Pro.git

cd RateLimiter-Pro
```

## Backend Setup

```bash
cd server

npm install

npm start
```

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

# 📡 API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/verify-otp
POST /api/auth/resend-otp
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

## API Keys

```http
POST /api/keys/create
GET /api/keys
DELETE /api/keys/:id
```

## Analytics

```http
GET /api/analytics/dashboard
GET /api/analytics/logs
GET /api/analytics/top-keys
GET /api/analytics/endpoints
GET /api/analytics/traffic
GET /api/analytics/apikey-analytics
```

## Demo APIs

```http
GET /api/products
GET /api/users
GET /api/orders
GET /api/posts
```

---

# 🎯 Key Highlights

- Redis-Based Rate Limiting
- JWT Authentication
- Email OTP Verification
- Forgot Password Flow
- API Key Management
- Real-Time Analytics
- Request Monitoring
- MongoDB Aggregation Pipelines
- Socket.IO Integration
- Production Ready Architecture

---

# 📸 Screenshots

Add screenshots after deployment.

```text
screenshots/
├── login.png
├── register.png
├── dashboard.png
├── analytics.png
├── api-keys.png
└── logs.png
```

---

# 👨‍💻 Author

**Shubham Kumar**

MCA Student | CDAC Noida

Full Stack Developer | MERN Stack | Core Java | System Design Enthusiast

---

# 🔮 Future Enhancements

- Admin Dashboard
- Team Workspaces
- API Billing
- Export Analytics Reports
- RBAC (Role Based Access Control)

---

⭐ If you found this project useful, give it a star on GitHub.
