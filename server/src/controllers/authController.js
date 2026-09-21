const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const { redisClient } = require("../config/redis");
const sendOTPEmail = require("../utils/sendEmail");


const register = async (req, res) => {
  try {
    const { name, email, password } =
      req.body;

    const exists =
      await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await User.create({
        name,
        email,
        password: hashedPassword,
        isVerified: false,
      });

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await redisClient.set(
      `otp:${email}`,
      otp
    );

    await redisClient.expire(
      `otp:${email}`,
      300
    );

    await sendOTPEmail(
      email,
      otp
    );

    res.status(201).json({
      message:
        "Registration successful. OTP sent to your email.",
      email: user.email,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};



const verifyOTP = async (
  req,
  res
) => {
  try {
    const { email, otp } =
      req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message:
          "Email and OTP are required",
      });
    }

    const storedOTP =
      await redisClient.get(
        `otp:${email}`
      );

    if (!storedOTP) {
      return res.status(400).json({
        message: "OTP Expired",
      });
    }

    if (
      storedOTP.toString() !==
      otp.toString()
    ) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    user.isVerified = true;

    await user.save();

    await redisClient.del(
      `otp:${email}`
    );

    res.status(200).json({
      message:
        "Email Verified Successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};



const resendOTP = async (
  req,
  res
) => {
  try {
    const { email } =
      req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await redisClient.set(
      `otp:${email}`,
      otp
    );

    await redisClient.expire(
      `otp:${email}`,
      300
    );

    await sendOTPEmail(
      email,
      otp
    );

    res.status(200).json({
      message:
        "OTP sent successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};



const forgotPassword = async (
  req,
  res
) => {
  try {
    const { email } =
      req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await redisClient.set(
      `resetotp:${email}`,
      otp
    );

    await redisClient.expire(
      `resetotp:${email}`,
      300
    );

    await sendOTPEmail(
      email,
      otp
    );

    res.status(200).json({
      message:
        "Reset OTP sent successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};


const resetPassword = async (
  req,
  res
) => {
  try {
    const {
      email,
      otp,
      newPassword,
    } = req.body;

    if (
      !email ||
      !otp ||
      !newPassword
    ) {
      return res.status(400).json({
        message:
          "All fields are required",
      });
    }

    const storedOTP =
      await redisClient.get(
        `resetotp:${email}`
      );

    if (!storedOTP) {
      return res.status(400).json({
        message:
          "OTP Expired",
      });
    }

    if (
      storedOTP.toString() !==
      otp.toString()
    ) {
      return res.status(400).json({
        message:
          "Invalid OTP",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    await User.findOneAndUpdate(
      { email },
      {
        password:
          hashedPassword,
      }
    );

    await redisClient.del(
      `resetotp:${email}`
    );

    res.status(200).json({
      message:
        "Password reset successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};


const login = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({
        email,
      });

    if (
      !user ||
      !(await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      return res.status(401).json({
        message:
          "Invalid Credentials",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message:
          "Please verify your email first",
      });
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(
        user._id
      ),
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  register,
  verifyOTP,
  resendOTP,
  forgotPassword,
  resetPassword,
  login,
};