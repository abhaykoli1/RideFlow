const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
} = require("../../controllers/user/payment-controller");

router.post("/createOrder", createOrder);
router.post("/verifyPayment", verifyPayment);

router.get("/get", (req, res) => {
  res.status(200).json({ status: true, message: "Done", data: "null" });
});

module.exports = router;
