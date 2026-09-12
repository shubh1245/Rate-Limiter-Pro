const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },

      key: {
        type: String,
        unique: true
      },

      limit: {
        type: Number,
        default: 10
      },

      window: {
        type: Number,
        default: 60
      }
    },
    {
      timestamps: true
    }
  );

module.exports =
  mongoose.model(
    "ApiKey",
    apiKeySchema
  );