const ApiKey = require("../models/ApiKey");
const generateApiKey = require("../utils/generateApiKey");

// Create API Key
const createApiKey = async (req, res) => {
  try {
    const apiKey = await ApiKey.create({
      userId: req.user._id,
      key: generateApiKey(),
      limit: 100,
      window: 60,
    });

    res.status(201).json(apiKey);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create API Key",
    });
  }
};

// Get All API Keys of Logged In User
const getApiKeys = async (req, res) => {
  try {
    const keys = await ApiKey.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(keys);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch API Keys",
    });
  }
};

// Delete API Key
const deleteApiKey = async (req, res) => {
  try {
    await ApiKey.findByIdAndDelete(req.params.id);

    res.json({
      message: "API Key Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Delete Failed",
    });
  }
};

module.exports = {
  createApiKey,
  getApiKeys,
  deleteApiKey,
};