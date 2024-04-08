const express = require("express");
const router = express.Router();
const { getKey, checkOut, paymentVerification } = require("../../controllers/Payment/PlatformChargesAndCollegeFee");

router.get("/getkey/:to", getKey);
router.post("/checkout/:to", checkOut);
router.post("/paymentverification/:data/:to", paymentVerification);

module.exports = router;