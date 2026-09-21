const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");

const {
  createApiKey,
  getApiKeys,
  deleteApiKey,
} = require("../controllers/apiKeyController");

router.get(
  "/",
  protect,
  getApiKeys
);

router.post(
  "/generate",
  protect,
  createApiKey
);

router.post(
  "/create",
  protect,
  createApiKey
);

router.delete(
  "/:id",
  protect,
  deleteApiKey
);

module.exports = router;