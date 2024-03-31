const Razorpay = require("razorpay");

const instanceForPlatformCharges = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

module.exports = instanceForPlatformCharges;