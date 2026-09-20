const RequestLog = require("../models/RequestLog");
const ApiKey = require("../models/ApiKey");


// Dashboard Summary

const getDashboardSummary = async (
  req,
  res
) => {
  try {
    const totalRequests =
      await RequestLog.countDocuments();

    const successfulRequests =
      await RequestLog.countDocuments({
        status: "SUCCESS",
      });

    const blockedRequests =
      await RequestLog.countDocuments({
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


// Top API Keys

const getTopApiKeys = async (
  req,
  res
) => {
  try {
    const topKeys =
      await RequestLog.aggregate([
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


// Daily Traffic Analytics

const getRequestsPerDay = async (
  req,
  res
) => {
  try {
    const stats =
      await RequestLog.aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format:
                  "%Y-%m-%d",
                date:
                  "$createdAt",
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


// Request Logs

const getRequestLogs = async (
  req,
  res
) => {
  try {
    const logs =
      await RequestLog.find()
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


// Endpoint Analytics

const getEndpointAnalytics =
  async (req, res) => {
    try {
      const endpointData =
        await RequestLog.aggregate([
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
        message:
          error.message,
      });
    }
  };


// API Key Analytics

const getApiKeyAnalytics =
  async (req, res) => {
    try {
      const apiKeys =
        await ApiKey.find()
          .sort({
            createdAt: -1,
          });

      const analytics =
        apiKeys.map((key) => ({
          _id: key._id,

          key: key.key,

          totalRequests:
            key.totalRequests || 0,

          successfulRequests:
            key.successfulRequests ||
            0,

          blockedRequests:
            key.blockedRequests ||
            0,

          lastUsed:
            key.lastUsed ||
            "Never",

          status:
            key.status ||
            "Active",

          createdAt:
            key.createdAt,
        }));

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