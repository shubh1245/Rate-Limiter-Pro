const express = require("express");

const router = express.Router();

const {
  register,
  login,
  verifyOTP,
  resendOTP,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post(
  "/register",
  register
);

router.post(
  "/verify-otp",
  verifyOTP
);

router.post(
  "/resend-otp",
  resendOTP
);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password",
  resetPassword
);

router.post(
  "/login",
  login
);

module.exports = router;