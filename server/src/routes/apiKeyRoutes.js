const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");

const {
  createApiKey
} = require(
  "../controllers/apiKeyController"
);

router.post(
  "/create",
  protect,
  createApiKey
);

module.exports = router;