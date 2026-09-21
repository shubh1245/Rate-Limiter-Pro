const ApiKey = require("../models/ApiKey");
const RequestLog = require("../models/RequestLog");
const { redisClient } = require("../config/redis");
const { getIO } = require("../socket/socket");

const rateLimiter = async (req, res, next) => {
  try {
    const apiKey = req.header("x-api-key");

    if (!apiKey) {
      return res.status(401).json({
        message: "API Key is required",
      });
    }

    const keyData = await ApiKey.findOne({
      key: apiKey,
    });

    if (!keyData) {
      return res.status(401).json({
        message: "Invalid API Key",
      });
    }

    const limit = keyData.limit;
    const window = keyData.window;

    const redisKey = `rate_limit:${apiKey}`;

    let currentCount =
      await redisClient.get(redisKey);

    currentCount = currentCount
      ? parseInt(currentCount)
      : 0;

    console.log("API Key:", apiKey);
    console.log("Current Count:", currentCount);
    console.log("Limit:", limit);
    console.log("Window:", window);

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

      await RequestLog.create({
        userId: keyData.userId,
        apiKey,
        endpoint: req.originalUrl,
        method: req.method,
        status: "BLOCKED",
        ipAddress: req.ip,
      });

      getIO().emit(
        "request-update",
        {
          type: "blocked",
        }
      );

      return res.status(429).json({
        message: "Rate Limit Exceeded",
      });
    }

    await redisClient.set(
      redisKey,
      currentCount + 1
    );

    if (currentCount === 0) {
      await redisClient.expire(
        redisKey,
        window
      );
    }

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

    await RequestLog.create({
      userId: keyData.userId,
      apiKey,
      endpoint: req.originalUrl,
      method: req.method,
      status: "SUCCESS",
      ipAddress: req.ip,
    });

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