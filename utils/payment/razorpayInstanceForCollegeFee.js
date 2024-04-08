const Razorpay = require("razorpay");

const instanceForCollegeFee = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY1,
  key_secret: process.env.RAZORPAY_API_SECRET1,
});

module.exports = instanceForCollegeFee;