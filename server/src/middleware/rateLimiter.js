const { redisClient } = require("../config/redis");

const ApiKey = require("../models/ApiKey");

const rateLimiter =
  async (req, res, next) => {
    try {
      const apiKey =
        req.headers["x-api-key"];

      if (!apiKey) {
        return res
          .status(401)
          .json({
            message:
              "API Key Required"
          });
      }

      const keyDoc =
        await ApiKey.findOne({
          key: apiKey
        });

      if (!keyDoc) {
        return res.status(401).json({
            message:
              "Invalid API Key"
          });
      }

      const redisKey = `bucket:${apiKey}`;

      let count = await redisClient.get( redisKey );

      count = Number(count);

      if (!count) {

        await redisClient.set(
          redisKey,
          1,
          {
            EX:
              keyDoc.window
          }
        );

        return next();
      }

      if (
        count >= keyDoc.limit
      ) {

        return res.status(429).json({
            message:
              "Rate Limit Exceeded"
          });
      }

      await redisClient.incr(
        redisKey
      );

      next();

    } catch (err) {

      res.status(500).json({
        message: err.message
      });

    }
};

module.exports = rateLimiter;