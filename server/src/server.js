require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");

const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");

const { initSocket } = require("./socket/socket");

const authRoutes = require("./routes/authRoutes");
const apiKeyRoutes = require("./routes/apiKeyRoutes");
const testRoutes = require("./routes/testRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const demoRoutes = require("./routes/demoRoutes");

connectDB();
connectRedis();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/keys", apiKeyRoutes);

app.use("/api/test", testRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api", demoRoutes);

app.get("/", (req, res) => {
  res.send("RateLimiter Pro API Running");
});

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});