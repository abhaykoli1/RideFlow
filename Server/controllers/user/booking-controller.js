// const Booking = require("../../models/booking");

// const bookRide = async (req, res) => {
//   try {
//     // Destructure the booking details from the request body
//     const {
//       userId,
//       bikeId,
//       bookedTimeSlots,
//       totalDays,
//       totalAmount,
//       status = "Pending", // Default status to 'Pending' if not provided
//       addressInfo,
//       orderId,
//     } = req.body;

//     // Validate that all required fields are present and valid
//     if (!userId || !bikeId || !totalDays || !totalAmount) {
//       return res.status(400).json({
//         status: "error",
//         message:
//           "Missing required fields: userId, bikeId, totalDays, and totalAmount are mandatory.",
//       });
//     }

//     // Validate `totalAmount` to be a positive number
//     if (totalAmount <= 0) {
//       return res.status(400).json({
//         status: "error",
//         message: "Total amount must be greater than zero.",
//       });
//     }

//     // Validate `totalDays` to be a positive integer
//     if (totalDays <= 0 || !Number.isInteger(totalDays)) {
//       return res.status(400).json({
//         status: "error",
//         message: "Total days must be a positive integer.",
//       });
//     }

//     // Validate `status` field to ensure it matches the allowed values
//     const validStatuses = ["Pending", "Confirmed", "Cancelled", "Completed"];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({
//         status: "error",
//         message: `Invalid status. Allowed values are: ${validStatuses.join(
//           ", "
//         )}.`,
//       });
//     }

//     // Validate `bookedTimeSlots` if provided
//     if (bookedTimeSlots) {
//       if (!Array.isArray(bookedTimeSlots) || bookedTimeSlots.length === 0) {
//         return res.status(400).json({
//           status: "error",
//           message: "bookedTimeSlots must be a non-empty array.",
//         });
//       }

//       // Validate each time slot's `from` and `to` dates
//       for (let slot of bookedTimeSlots) {
//         if (!slot.from || !slot.to) {
//           return res.status(400).json({
//             status: "error",
//             message: "Each time slot must have a 'from' and 'to' date.",
//           });
//         }

//         const fromDate = new Date(slot.from);
//         const toDate = new Date(slot.to);

//         if (isNaN(fromDate) || isNaN(toDate)) {
//           return res.status(400).json({
//             status: "error",
//             message:
//               "Invalid date format in bookedTimeSlots. Ensure 'from' and 'to' are valid dates.",
//           });
//         }

//         if (fromDate >= toDate) {
//           return res.status(400).json({
//             status: "error",
//             message: "'from' date must be earlier than 'to' date in each slot.",
//           });
//         }
//       }
//     }

//     // Validate `addressInfo` if provided
//     if (addressInfo) {
//       const { userId, address, city, pincode, phone } = addressInfo;
//       if (!userId || !address || !city || !pincode || !phone) {
//         return res.status(400).json({
//           status: "error",
//           message: "Incomplete address information provided.",
//         });
//       }
//     }

//     // Prepare the booking data object
//     const bookingData = {
//       userId,
//       bikeId,
//       bookedTimeSlots,
//       totalDays,
//       totalAmount,
//       status,
//       addressInfo,
//       orderId,
//     };

//     // Create a new booking instance
//     const newBooking = new Booking(bookingData);

//     // Save the new booking to the database
//     await newBooking.save();

//     // Send success response with HTTP status 201 (Created)
//     return res.status(201).json({
//       status: "success",
//       message: "Your booking has been placed successfully.",
//       bookingId: newBooking._id, // Return the created booking ID
//     });
//   } catch (error) {
//     // Log the error for debugging
//     console.error("Error placing booking:", error);

//     // Return a descriptive error response
//     return res.status(500).json({
//       status: "error",
//       message: "An error occurred while placing the booking. Please try again.",
//     });
//   }
// };

// module.exports = {
//   bookRide,
// };

const Booking = require("../../models/booking"); // Import the Booking model
const User = require("../../models/User"); // Import the User model (for user validation)
const Ride = require("../../models/Rides"); // Import the Bike model (for bike validation)

// // Create a new booking
const bookRide = async (req, res) => {
  try {
    const {
      userId,
      bikeId,
      bookedTimeSlots,
      totalDays,
      totalAmount,
      status,
      addressInfo,
      dl,
      phone,
      orderId,
    } = req.body;

    // Input validation
    if (
      !userId ||
      !bikeId ||
      !bookedTimeSlots.from ||
      !bookedTimeSlots.to ||
      !totalDays ||
      !dl ||
      !phone ||
      !totalAmount
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate if bike exists
    const bike = await Ride.findById(bikeId);
    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }

    // Check for overlapping bookings
    // const overlappingBookings = await Booking.findOne({
    //   bikeId,
    //   $or: [
    //     {
    //       "bookedTimeSlots.from": { $lt: bookedTimeSlots.to },
    //       "bookedTimeSlots.to": { $gt: bookedTimeSlots.from },
    //     },
    //   ],
    // });

    // if (overlappingBookings) {
    //   return res.status(400).json({
    //     message: "Bike is already booked for the selected time slots",
    //   });
    // }

    // Create a new booking
    const newBooking = new Booking({
      userId,
      bikeId,
      bookedTimeSlots,
      totalDays,
      totalAmount,
      // status,
      status: status || "Pending", // Default to 'Pending' if not provided
      addressInfo,
      dl,
      phone,
      // phone: phone.trim(),
      orderId,
    });

    // Save the booking to the database
    await newBooking.save();

    // Send success response
    res.status(201).json({
      message: "Booking successful",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error while booking ride:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// Get all bookings (Admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId"); // Populate user and bike details

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// Get bookings by userId (User's own bookings)
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const bookings = await Booking.find({ userId })
      .populate("bikeId")
      .sort({ createdAt: -1 }); // Sort bookings by most recent

    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// // Update booking status (for example, to Confirmed or Cancelled)
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;

    // Validate status
    if (!["Pending", "Confirmed", "Cancelled", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Update the booking status
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking status updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Delete the booking by ID
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// Export the controller functions
module.exports = {
  bookRide,
  getAllBookings,
  getUserBookings,
  updateBookingStatus,
  deleteBooking,
};
