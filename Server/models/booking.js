// const mongoose = require("mongoose");

// // Booking schema definition
// const bookingSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Reference to the User collection
//       required: true,
//     },
//     bikeId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Rides", // Reference to the Rides collection
//       required: true,
//     },
//     bookedTimeSlots: [
//       {
//         from: {
//           type: Date, // Correct type for timestamp
//           required: true,
//         },
//         to: {
//           type: Date, // Correct type for timestamp
//           required: true,
//         },
//       },
//     ],
//     addressInfo: {
//       userId: {
//         type: String,
//         required: true,
//       },
//       address: {
//         type: String,
//         required: true,
//       },
//       city: {
//         type: String,
//         required: true,
//       },
//       pincode: {
//         type: String,
//         required: true,
//       },
//       phone: {
//         type: String,
//         required: true,
//       },
//     },
//     totalDays: {
//       type: Number,
//       required: true,
//       min: 1, // Ensures at least one day is booked
//     },
//     totalAmount: {
//       type: Number,
//       required: true,
//       min: 0, // Ensures no negative amounts
//     },
//     orderId: {
//       type: String,
//       required: true, // Assuming it should always be present
//     },
//     status: {
//       type: String,
//       default: "Pending", // Default status
//       enum: ["Pending", "Confirmed", "Cancelled", "Completed"], // Valid statuses
//     },
//   },
//   { timestamps: true } // Automatically adds createdAt and updatedAt fields
// );

// // Define and export the Booking model
// const bookingModel = mongoose.model("Booking", bookingSchema);

// module.exports = bookingModel;

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
    ref: "Bike",
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
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    pincode: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 15,
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
