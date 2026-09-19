const express = require("express");

const router = express.Router();

const {
  getDashboardSummary,
  getTopApiKeys,
  getRequestsPerDay,
  getRequestLogs
} = require("../controllers/analyticsController");

router.get("/summary", getDashboardSummary);

router.get("/top-keys", getTopApiKeys);

router.get("/requests-per-day", getRequestsPerDay);

router.get("/logs", getRequestLogs);

module.exports = router;