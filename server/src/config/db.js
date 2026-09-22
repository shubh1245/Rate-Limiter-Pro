const mongoose = require("mongoose");
const dns = require("dns")
require("dotenv").config();

dns.setServers([
  "1.1.1.1" , "8.8.8.8"
]);

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.log(
      "MONGO_URI is not set. Add it in your Render service's Environment tab."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB connection failed:", err.message);

    process.exit(1);
  }
};

module.exports = connectDB;