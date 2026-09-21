const mongoose = require("mongoose");

const requestLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    apiKey: {
      type: String,
      required: true,
    },

    endpoint: {
      type: String,
      required: true,
    },

    method: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["SUCCESS", "BLOCKED"],
    },

    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "RequestLog",
  requestLogSchema
);