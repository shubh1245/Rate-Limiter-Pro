require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");

const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");

const { initSocket } = require("./socket/socket");

connectDB();
connectRedis();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/keys",
  require("./routes/apiKeyRoutes")
);

app.use(
  "/api/test",
  require("./routes/testRoutes")
);

app.use(
  "/api/analytics",
  require("./routes/analyticsRoutes")
);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Start Server
server.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});