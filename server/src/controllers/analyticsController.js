const RequestLog = require("../models/RequestLog");
const ApiKey = require("../models/ApiKey");

const getDashboardSummary = async (
  req,
  res
) => {
  try {
    const totalRequests =
      await RequestLog.countDocuments({
        userId: req.user._id,
      });

    const successfulRequests =
      await RequestLog.countDocuments({
        userId: req.user._id,
        status: "SUCCESS",
      });

    const blockedRequests =
      await RequestLog.countDocuments({
        userId: req.user._id,
        status: "BLOCKED",
      });

    res.json({
      totalRequests,
      successfulRequests,
      blockedRequests,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTopApiKeys = async (
  req,
  res
) => {
  try {
    const topKeys =
      await RequestLog.aggregate([
        {
          $match: {
            userId: req.user._id,
          },
        },
        {
          $group: {
            _id: "$apiKey",
            requests: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            requests: -1,
          },
        },
        {
          $limit: 5,
        },
      ]);

    res.json(topKeys);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRequestsPerDay = async (
  req,
  res
) => {
  try {
    const stats =
      await RequestLog.aggregate([
        {
          $match: {
            userId: req.user._id,
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
            requests: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRequestLogs = async (
  req,
  res
) => {
  try {
    const logs =
      await RequestLog.find({
        userId: req.user._id,
      })
        .sort({
          createdAt: -1,
        })
        .limit(100);

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getEndpointAnalytics =
  async (req, res) => {
    try {
      const endpointData =
        await RequestLog.aggregate([
          {
            $match: {
              userId: req.user._id,
            },
          },
          {
            $group: {
              _id: "$endpoint",
              count: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              count: -1,
            },
          },
          {
            $limit: 10,
          },
        ]);

      res.json(endpointData);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

const getApiKeyAnalytics =
  async (req, res) => {
    try {
      const apiKeys =
        await ApiKey.find({
          userId: req.user._id,
        }).sort({
          createdAt: -1,
        });

      const analytics =
        apiKeys.map((key) => {
          const THIRTY_DAYS =
            30 *
            24 *
            60 *
            60 *
            1000;

          let status =
            "Never Used";

          if (key.lastUsed) {
            status =
              Date.now() -
                new Date(
                  key.lastUsed
                ).getTime() <
              THIRTY_DAYS
                ? "Active"
                : "Inactive";
          }

          return {
            _id: key._id,
            key: key.key,
            totalRequests:
              key.totalRequests ||
              0,
            successfulRequests:
              key.successfulRequests ||
              0,
            blockedRequests:
              key.blockedRequests ||
              0,
            lastUsed:
              key.lastUsed ||
              "Never",
            status,
            createdAt:
              key.createdAt,
          };
        });

      res.json(analytics);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch API Key Analytics",
      });
    }
  };

module.exports = {
  getDashboardSummary,
  getTopApiKeys,
  getRequestsPerDay,
  getRequestLogs,
  getEndpointAnalytics,
  getApiKeyAnalytics,
};