const { v4: uuidv4 } = require("uuid");

const generateApiKey = () => {
  return `rlp_${uuidv4()}`;
};

module.exports =
  generateApiKey;