const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");


// Register

const register = async (req, res) => {
  try {

    const { name, email, password } =
      req.body;

    const exists =
      await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await User.create({
        name,
        email,
        password: hashedPassword
      });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};



// Login

const login = async (req, res) => {
  try {

    const { email, password } =
      req.body;

    const user =
      await User.findOne({ email });

    if (
      user &&
      await bcrypt.compare(
        password,
        user.password
      )
    ) {

      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });

    } else {

      res.status(401).json({
        message:
          "Invalid Credentials"
      });

    }

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

module.exports = {
  register,
  login
};