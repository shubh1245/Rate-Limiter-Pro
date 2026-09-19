const express = require("express");

const router = express.Router();

const {
  getDashboardSummary,
  getTopApiKeys,
  getRequestsPerDay,
  getRequestLogs,
  getEndpointAnalytics
} = require("../controllers/analyticsController");

router.get("/summary", getDashboardSummary);

router.get("/top-keys", getTopApiKeys);

router.get("/requests-per-day", getRequestsPerDay);

router.get("/logs", getRequestLogs);

router.get("/endpoints", getEndpointAnalytics);

module.exports = router;