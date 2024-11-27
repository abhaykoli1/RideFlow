const mongoose = require("mongoose");

// Define the Bike Ride Booking Schema
const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bikeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rides",
    required: true,
  },
  bookedTimeSlots: {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
  },

  totalDays: {
    type: Number,
    required: true,
    min: 1,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
    default: "Pending",
  },
  addressInfo: {
    // address: {
    //   type: String,
    //   required: false,
    // },
    // city: {
    //   type: String,
    //   required: false,
    // },
    // pincode: {
    //   type: String,
    //   required: false,
    // },
    // phone: {
    //   type: String,
    //   required: false,
    // },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    pincode: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 15,
    // match: /^[0-9]{10,15}$/,
  },
  dl: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp when the booking was created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Timestamp for when the booking was last updated
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
