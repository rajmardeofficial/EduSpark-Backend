const express = require("express");
const router = express.Router();
const { getKey, checkOut, paymentVerification } = require("../../controllers/Payment/PlatformCharges");

router.get("/getkey", getKey);
router.post("/checkout", checkOut);
router.post("/paymentverification/:data", paymentVerification);

module.exports = router;