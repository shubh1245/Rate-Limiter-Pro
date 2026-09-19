const RequestLog = require("../models/RequestLog");

// Dashboard Summary
const getDashboardSummary = async (req, res) => {
  try {
    const totalRequests = await RequestLog.countDocuments();

    const successfulRequests = await RequestLog.countDocuments({
      status: "SUCCESS",
    });

    const blockedRequests = await RequestLog.countDocuments({
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
const getTopApiKeys = async (req, res) => {
  try {
    const topKeys = await RequestLog.aggregate([
      {
        $group: {
          _id: "$apiKey",
          requests: { $sum: 1 },
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


// Requests Per Day
const getRequestsPerDay = async (req, res) => {
  try {
    const stats = await RequestLog.aggregate([
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

// Request Logs
const getRequestLogs = async (req, res) => {
  try {

    const logs = await RequestLog
      .find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(logs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getEndpointAnalytics = async (req, res) => {
  try {

    const endpointData =
      await RequestLog.aggregate([
        {
          $group: {
            _id: "$endpoint",
            count: { $sum: 1 }
          }
        }
      ]);

    res.json(endpointData);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  getDashboardSummary,
  getTopApiKeys,
  getRequestsPerDay,
  getRequestLogs,
  getEndpointAnalytics
};