const Booking = require("../../models/booking");
const User = require("../../models/User");
const Ride = require("../../models/Rides");
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
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate if bike exists
    const bike = await Ride.findById(bikeId);
    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found",
      });
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
      status: status || "Pending", // Default to 'Pending' if not provided
      addressInfo,
      dl,
      phone,
    });

    // Save the booking to the database
    await newBooking.save();

    // Send success response
    res.status(201).json({
      message: "Your Booking Placed successfully",
      success: true,
      booking: newBooking,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

// Get all bookings (Admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId");
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
      return res.status(404).json({ message: "Bookings arn't available" });
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
