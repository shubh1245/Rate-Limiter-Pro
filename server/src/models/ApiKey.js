const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      default: "Default API Key",
    },

    key: {
      type: String,
      required: true,
      unique: true,
    },

    totalRequests: {
      type: Number,
      default: 0,
    },

    successfulRequests: {
      type: Number,
      default: 0,
    },

    blockedRequests: {
      type: Number,
      default: 0,
    },

    lastUsed: {
      type: Date,
    },

    status: {
      type: String,
      default: "Active",
    },

    limit: {
      type: Number,
      default: 1,
    },

    window: {
      type: Number,
      default: 60,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ApiKey", apiKeySchema);