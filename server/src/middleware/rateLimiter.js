const ApiKey = require("../models/ApiKey");
const RequestLog = require("../models/RequestLog");
const { redisClient } = require("../config/redis");
const { getIO } = require("../socket/socket");

const rateLimiter = async (req, res, next) => {
  try {
    // Get API Key
    const apiKey = req.header("x-api-key");

    if (!apiKey) {
      return res.status(401).json({
        message: "API Key is required",
      });
    }

    // Check API Key
    const keyData = await ApiKey.findOne({
      key: apiKey,
    });

    if (!keyData) {
      return res.status(401).json({
        message: "Invalid API Key",
      });
    }

    const limit = keyData.limit;

    // Redis Key
    const redisKey = `rate_limit:${apiKey}`;

    // Current Count
    let currentCount =
      await redisClient.get(redisKey);

    currentCount = currentCount
      ? parseInt(currentCount)
      : 0;

    // BLOCKED REQUEST
    if (currentCount >= limit) {
      await ApiKey.findByIdAndUpdate(
        keyData._id,
        {
          $inc: {
            totalRequests: 1,
            blockedRequests: 1,
          },
          lastUsed: new Date(),
        }
      );

      // Request Log
      await RequestLog.create({
        apiKey,
        endpoint: req.originalUrl,
        method: req.method,
        status: "BLOCKED",
        ipAddress: req.ip,
      });

      // Socket Event
      getIO().emit(
        "request-update",
        {
          type: "blocked",
        }
      );

      return res.status(429).json({
        message:
          "Rate Limit Exceeded",
      });
    }

    // Increment Count
    await redisClient.set(
      redisKey,
      currentCount + 1
    );

    // Expire After 60 Seconds
    if (currentCount === 0) {
      await redisClient.expire(
        redisKey,
        60
      );
    }

    // Update API Key Analytics
    await ApiKey.findByIdAndUpdate(
      keyData._id,
      {
        $inc: {
          totalRequests: 1,
          successfulRequests: 1,
        },
        lastUsed: new Date(),
      }
    );

    // Request Log
    await RequestLog.create({
      apiKey,
      endpoint: req.originalUrl,
      method: req.method,
      status: "SUCCESS",
      ipAddress: req.ip,
    });

    // Socket Event
    getIO().emit(
      "request-update",
      {
        type: "success",
      }
    );

    next();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = rateLimiter;