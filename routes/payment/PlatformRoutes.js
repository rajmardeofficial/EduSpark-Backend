const express = require("express");
const router = express.Router();
const { getKey, checkOut, paymentVerification } = require("../../controllers/Payment/HandleAllTypeOfPayment");
const { authenticate, authorizeStudent } = require("../../controllers/authController");

router.get("/getkey/:to", getKey);
router.post("/checkout/:to", checkOut);
router.post("/paymentverification/:data/:to", authenticate, authorizeStudent, paymentVerification);

module.exports = router;