const { redisClient } = require("../config/redis");
const ApiKey = require("../models/ApiKey");
const RequestLog = require("../models/RequestLog");

const rateLimiter = async (req, res, next) => {
  try {
    const apiKey = req.header("x-api-key");

    if (!apiKey) {
      return res.status(401).json({
        message: "API Key Required"
      });
    }

    const keyDoc = await ApiKey.findOne({ key: apiKey });

    if (!keyDoc) {
      return res.status(401).json({
        message: "Invalid API Key"
      });
    }

    const redisKey = `bucket:${apiKey}`;

    let currentCount = await redisClient.get(redisKey);

    currentCount = currentCount
      ? parseInt(currentCount)
      : 0;


    // LIMIT EXCEEDED
    if (currentCount >= keyDoc.limit) {

      await RequestLog.create({
        apiKey,
        endpoint: req.originalUrl,
        method: req.method,
        status: "BLOCKED",
        ipAddress: req.ip
      });

      console.log("RATE LIMIT EXCEEDED");

      return res.status(429).json({
        message: "Rate Limit Exceeded"
      });
    }

    await redisClient.set(
      redisKey,
      currentCount + 1,
      {
        EX: keyDoc.window
      }
    );

    // SUCCESS REQUEST
    await RequestLog.create({
      apiKey,
      endpoint: req.originalUrl,
      method: req.method,
      status: "SUCCESS",
      ipAddress: req.ip
    });

    next();

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = rateLimiter;