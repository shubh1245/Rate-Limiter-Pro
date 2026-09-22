require("dotenv").config();

process.on("unhandledRejection", (reason) => {
  console.log("Unhandled Promise Rejection:", reason);
});

const express = require("express");
const cors = require("cors");
const http = require("http");

const connectDB = require("./config/db");
const {
  connectRedis,
} = require("./config/redis");

const {
  initSocket,
} = require("./socket/socket");

const authRoutes = require(
  "./routes/authRoutes"
);

const apiKeyRoutes = require(
  "./routes/apiKeyRoutes"
);

const testRoutes = require(
  "./routes/testRoutes"
);

const analyticsRoutes = require(
  "./routes/analyticsRoutes"
);

const demoRoutes = require(
  "./routes/demoRoutes"
);

// Database & Redis

connectDB();
connectRedis();

const app = express();

// Middleware

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());

// Routes

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/keys",
  apiKeyRoutes
);

app.use(
  "/api/test",
  testRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(
  "/api/demo",
  demoRoutes
);

// Health Check

app.get("/", (req, res) => {
  res.send(
    "RateLimiter Pro API Running 🚀"
  );
});

// Server

const PORT =
  process.env.PORT || 5000;

const server =
  http.createServer(app);

// Socket.IO

initSocket(server);

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});