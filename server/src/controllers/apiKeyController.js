 const ApiKey = require("../models/ApiKey");

const generateApiKey = require("../utils/generateApiKey");

const createApiKey =
  async (req, res) => {

    const apiKey =
      await ApiKey.create({
        userId: req.user._id,
        key: generateApiKey()
      });

    res.json(apiKey);
};

module.exports = {
  createApiKey
};