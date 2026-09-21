const express = require("express");

const router = express.Router();

const rateLimiter = require(
  "../middleware/rateLimiter"
);

router.get(
  "/users",
  rateLimiter,
  (req, res) => {
    res.json({
      success: true,
      endpoint: "users",
    });
  }
);

router.get(
  "/products",
  rateLimiter,
  (req, res) => {
    res.json({
      success: true,
      endpoint: "products",
    });
  }
);

router.get(
  "/orders",
  rateLimiter,
  (req, res) => {
    res.json({
      success: true,
      endpoint: "orders",
    });
  }
);

router.get(
  "/payments",
  rateLimiter,
  (req, res) => {
    res.json({
      success: true,
      endpoint: "payments",
    });
  }
);

router.get(
  "/reports",
  rateLimiter,
  (req, res) => {
    res.json({
      success: true,
      endpoint: "reports",
    });
  }
);

module.exports = router;