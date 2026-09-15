const express = require("express");

const router = express.Router();

const {
  getDashboardSummary,
  getTopApiKeys,
  getRequestsPerDay
} = require("../controllers/analyticsController");

router.get(
  "/summary",
  getDashboardSummary
);

router.get(
  "/top-keys",
  getTopApiKeys
);

router.get(
  "/requests-per-day",
  getRequestsPerDay
);

module.exports = router;