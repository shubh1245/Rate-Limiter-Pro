const ApiKey = require("../models/ApiKey");
const generateApiKey = require("../utils/generateApiKey");

const createApiKey = async (req, res) => {
  try {
    const apiKey = await ApiKey.create({
      userId: req.user._id,
      key: generateApiKey(),
      limit: 10,
      window: 60,
      status: "Active",
    });

    res.status(201).json(apiKey);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getApiKeys = async (req, res) => {
  try {
    const keys = await ApiKey.find({
      userId: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(keys);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteApiKey = async (req, res) => {
  try {
    const apiKey = await ApiKey.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!apiKey) {
      return res.status(404).json({
        message: "API Key not found",
      });
    }

    await apiKey.deleteOne();

    res.status(200).json({
      message: "API Key deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createApiKey,
  getApiKeys,
  deleteApiKey,
};