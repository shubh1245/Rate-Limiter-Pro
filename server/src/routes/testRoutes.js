const express = require("express");

const router = express.Router();

const rateLimiter = require("../middleware/rateLimiter");

router.get("/", rateLimiter, (req, res) => {
  res.json({
    success: true,
    message: "API Access Granted",
  });
});

module.exports = router;