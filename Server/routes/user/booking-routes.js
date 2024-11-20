const express = require("express");
const router = express.Router();

// Import the booking controller
const { bookRide } = require("../../controllers/user/booking-controller");

// Example middleware for authentication (optional, based on your use case)
// const { authenticateUser } = require("../../middlewares/authMiddleware");

// Route to book a ride
// router.post("/user/bookRide", authenticateUser, bookRide); // Uncomment this if authentication is needed
router.post("/bookride", bookRide); // Using a more RESTful approach with /bookings

module.exports = router;
