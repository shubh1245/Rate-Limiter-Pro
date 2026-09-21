const express = require("express");
const router = express.Router();

const rateLimiter = require("../middleware/rateLimiter");

router.get("/users", rateLimiter, (req, res) => {
  res.json({
    success: true,
    endpoint: "/api/users",
    message: "Users API Working",
  });
});

router.get("/products", rateLimiter, (req, res) => {
  res.json({
    success: true,
    endpoint: "/api/products",
    message: "Products API Working",
  });
});

router.get("/orders", rateLimiter, (req, res) => {
  res.json({
    success: true,
    endpoint: "/api/orders",
    message: "Orders API Working",
  });
});

router.get("/dashboard", rateLimiter, (req, res) => {
  res.json({
    success: true,
    endpoint: "/api/dashboard",
    message: "Dashboard API Working",
  });
});

router.get("/reports", rateLimiter, (req, res) => {
  res.json({
    success: true,
    endpoint: "/api/reports",
    message: "Reports API Working",
  });
});

module.exports = router;