const mongoose = require("mongoose");

// Booking schema definition
const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User collection
      required: true,
    },
    bikeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rides", // Reference to the Rides collection
      required: true,
    },
    bookedTimeSlots: [
      {
        from: {
          type: Date, // Change to Date type for proper timestamp handling
          required: true,
        },
        to: {
          type: Date, // Change to Date type for proper timestamp handling
          required: true,
        },
      },
    ],
    totalHours: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    transitionId: {
      type: String,
      required: true, // Assuming transitionId should always be present
    },
    status: {
      type: String,
      default: "Pending", // Default status if none is provided
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"], // Ensures only valid statuses
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Define the model with the correct name
const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = bookingModel;
