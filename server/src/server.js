require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
connectDB();

const { connectRedis } = require("./config/redis");
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

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});