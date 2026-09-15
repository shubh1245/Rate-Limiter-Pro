const ApiKey = require("../models/ApiKey");
const RequestLog = require("../models/RequestLog");
const { redisClient } = require("../config/redis");

const rateLimiter = async (req, res, next) => {
  try {
    // Get API Key from headers
    const apiKey = req.header("x-api-key");

    if (!apiKey) {
      return res.status(401).json({
        message: "API Key is required",
      });
    }

    // Check API Key in MongoDB
    const keyData = await ApiKey.findOne({ key: apiKey });

    if (!keyData) {
      return res.status(401).json({
        message: "Invalid API Key",
      });
    }

    const limit = keyData.limit;

    // Redis Key
    const redisKey = `rate_limit:${apiKey}`;

    // Get Current Count
    let currentCount = await redisClient.get(redisKey);

    currentCount = currentCount ? parseInt(currentCount) : 0;

    // Limit Exceeded
    if (currentCount >= limit) {
      await RequestLog.create({
        apiKey,
        endpoint: req.originalUrl,
        method: req.method,
        status: "BLOCKED",
        ipAddress: req.ip,
      });

      return res.status(429).json({
        message: "Rate Limit Exceeded",
      });
    }

    // Increment Count
    await redisClient.set(redisKey, currentCount + 1);

    // Set Expiry (60 seconds)
    if (currentCount === 0) {
      await redisClient.expire(redisKey, 60);
    }

    // Log Successful Request
    await RequestLog.create({
      apiKey,
      endpoint: req.originalUrl,
      method: req.method,
      status: "SUCCESS",
      ipAddress: req.ip,
    });

    next();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = rateLimiter;