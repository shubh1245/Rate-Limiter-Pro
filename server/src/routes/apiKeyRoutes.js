const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");

const {
  createApiKey,
  getApiKeys,
  deleteApiKey,
} = require("../controllers/apiKeyController");

// Get all keys
router.get(
  "/",
  protect,
  getApiKeys
);

// Generate key
router.post(
  "/generate",
  protect,
  createApiKey
);

// Old route (optional)
router.post(
  "/create",
  protect,
  createApiKey
);

// Delete key
router.delete(
  "/:id",
  protect,
  deleteApiKey
);

module.exports = router;