const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");

const {
  getDashboardSummary,
  getTopApiKeys,
  getRequestsPerDay,
  getRequestLogs,
  getEndpointAnalytics,
  getApiKeyAnalytics,
} = require("../controllers/analyticsController");


// Dashboard Summary

router.get(
  "/summary",
  protect,
  getDashboardSummary
);


// Top API Keys

router.get(
  "/top-keys",
  protect,
  getTopApiKeys
);


// Daily Traffic Analytics

router.get(
  "/requests-per-day",
  protect,
  getRequestsPerDay
);


// Request Logs

router.get(
  "/logs",
  protect,
  getRequestLogs
);


// Endpoint Analytics

router.get(
  "/endpoints",
  protect,
  getEndpointAnalytics
);


// API Key Analytics

router.get(
  "/apikeys",
  protect,
  getApiKeyAnalytics
);


module.exports = router;