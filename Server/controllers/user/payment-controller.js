const crypto = require("crypto");
const { createRazorPayInstance } = require("../../config/razorpay.config");
const { createBooking } = require("../../controllers/user/booking-controller");

const razorPayInstance = createRazorPayInstance();

// ✅ Create Razorpay Order
const createOrder = async (req, res) => {
  const { id, price } = req.body;

  if (!id || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const receipt = `rcpt_${id}_${Date.now().toString().slice(-6)}`; // Max 40 chars

  const options = {
    amount: price,
    currency: "INR",
    receipt, // valid now
    payment_capture: 1,
  };

  try {
    console.log("Creating Razorpay order with options:", options);
    const order = await razorPayInstance.orders.create(options);
    console.log("✅ Razorpay Order Created:", order);
    return res.status(201).json(order);
  } catch (error) {
    console.log("❌ Razorpay order creation failed:", error);
    return res.status(500).json({
      success: false,
      error: "Order creation failed",
      details: error.message,
    });
  }
};

// ✅ Verify Razorpay Signature
const verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature, bookingData } = req.body;

  console.log("Sending verification + bookingData:", {
    order_id,
    payment_id,
    signature,
    bookingData,
  });

  console.log("bookingData", bookingData);

  const body = `${order_id}|${payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === signature) {
    try {
      const booking = await createBooking(bookingData);
      return res.status(200).json({
        success: true,
        message: "Payment verified & ride booked successfully",
        booking,
      });
    } catch (error) {
      console.error("Booking failed after payment:", error.message);
      return res.status(500).json({
        success: false,
        message: "Payment verified but booking failed",
        error: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid signature",
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};
