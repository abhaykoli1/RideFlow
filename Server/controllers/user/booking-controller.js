const Booking = require("../../models/booking");
// const { v4: uuidv4 } = require("uuid"); // Use UUID for a unique transition ID

// Controller for booking a ride
const bookRide = async (req, res) => {
  try {
    // Generate a unique transition ID using UUID
    const transitionId = "1234";

    // Destructure the booking details from the request body
    const { userId, bikeId, bookedTimeSlots, totalHours, totalAmount, status } =
      req.body;

    // Validate that all required fields are present and valid
    if (
      !userId ||
      !bikeId ||
      !bookedTimeSlots ||
      !totalHours ||
      !totalAmount ||
      !status
    ) {
      return res.status(400).json({
        status: "error",
        message:
          "Missing required fields. Please check your input and try again.",
      });
    }

    // Validate totalAmount to be positive
    if (totalAmount <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Total amount must be greater than zero.",
      });
    }

    // Validate totalHours to be a positive number
    if (totalHours <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Total hours must be greater than zero.",
      });
    }

    // Validate status field
    if (!["Pending", "Confirmed", "Cancelled", "Completed"].includes(status)) {
      return res.status(400).json({
        status: "error",
        message:
          "Invalid status. Status must be one of 'Pending', 'Confirmed', 'Cancelled', 'Completed'.",
      });
    }

    // Validate bookedTimeSlots - it should be an array and contain valid date objects
    if (!Array.isArray(bookedTimeSlots) || bookedTimeSlots.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "bookedTimeSlots must be a non-empty array.",
      });
    }

    // Validate that each time slot has valid 'from' and 'to' fields as Date objects
    for (let slot of bookedTimeSlots) {
      if (!slot.from || !slot.to) {
        return res.status(400).json({
          status: "error",
          message: "Each booked time slot must have a 'from' and 'to' field.",
        });
      }

      // Ensure 'from' and 'to' are valid dates
      if (isNaN(new Date(slot.from)) || isNaN(new Date(slot.to))) {
        return res.status(400).json({
          status: "error",
          message:
            "Invalid date format in bookedTimeSlots. Ensure 'from' and 'to' are valid dates.",
        });
      }

      // Ensure that 'from' is earlier than 'to'
      const fromDate = new Date(slot.from);
      const toDate = new Date(slot.to);
      if (fromDate >= toDate) {
        return res.status(400).json({
          status: "error",
          message:
            "'from' time must be earlier than 'to' time in each time slot.",
        });
      }
    }

    // Prepare the booking data object
    const bookingData = {
      userId,
      bikeId,
      bookedTimeSlots,
      totalHours,
      totalAmount,
      status,
      transitionId,
    };

    // Create a new booking instance
    const newBooking = new Booking(bookingData);

    // Save the new booking to the database
    await newBooking.save();

    // Send success response with HTTP status 201 (Created)
    return res.status(201).json({
      status: "success",
      message: "Your booking has been placed successfully.",
      bookingId: newBooking._id, // Optionally return the created booking ID
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error placing booking:", error);

    // Return a more descriptive error response
    return res.status(500).json({
      status: "error",
      message: "Error placing the booking. Please try again later.",
    });
  }
};

module.exports = {
  bookRide,
};
