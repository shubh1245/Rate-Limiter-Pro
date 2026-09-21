const nodemailer = require("nodemailer");

const transporter =
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

const sendOTPEmail = async (
  email,
  otp
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject:
      "RateLimiter Pro Email Verification",

    html: `
      <div style="font-family:sans-serif">
        <h2>RateLimiter Pro</h2>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>Expires in 5 minutes.</p>
      </div>
    `,
  });
};

module.exports = sendOTPEmail;