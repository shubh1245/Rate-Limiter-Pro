const { createClient } = require("redis");

const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("connect", () => {
  console.log("Redis Connected");
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error(
      "Redis Connection Failed:",
      error
    );
  }
};

module.exports = {
  redisClient,
  connectRedis,
};