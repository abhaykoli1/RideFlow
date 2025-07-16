const Booking = require("../../models/booking");
const User = require("../../models/User");
const Ride = require("../../models/Rides");
const nodemailer = require("nodemailer");

// const bookRide = async (req, res) => {
//   try {
//     const {
//       userId,
//       bikeId,
//       bookedTimeSlots,
//       totalDays,
//       totalAmount,
//       status,
//       addressInfo,
//       dl,
//       phone,
//     } = req.body;

//     if (
//       !userId ||
//       !bikeId ||
//       !bookedTimeSlots.from ||
//       !bookedTimeSlots.to ||
//       !totalDays ||
//       !totalAmount
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields",
//       });
//     }
//     if (!dl) {
//       return res.status(400).json({
//         success: false,
//         message: "Please Enter Driving Licence Number",
//       });
//     }
//     if (!phone) {
//       return res.status(400).json({
//         success: false,
//         message: "Please Enter Mobile Number",
//       });
//     }

//     const dlRegex = /^[A-Za-z]{2}[0-9]{2}(?: [0-9]{11}|[A-Za-z][0-9]{11})$/;

//     if (!dlRegex.test(dl)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Driving Licence format! Use RJ14D00000000000.",
//       });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: true,
//         message: "User not found",
//       });
//     }

//     const bike = await Ride.findById(bikeId);
//     if (!bike) {
//       return res.status(404).json({
//         success: false,
//         message: "Bike got out of Stock",
//       });
//     }

//     const newBooking = new Booking({
//       userId,
//       bikeId,
//       bookedTimeSlots,
//       totalDays,
//       totalAmount,
//       status: status || "Pending",
//       addressInfo,
//       dl,
//       phone,
//     });

//     await newBooking.save();

//     res.status(201).json({
//       success: true,
//       message: "Your Booking Placed successfully",
//       booking: newBooking,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error. Please try again.",
//     });
//   }
// };

const createBooking = async (bookingData) => {
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
  } = bookingData;

  if (
    !userId ||
    !bikeId ||
    !bookedTimeSlots?.from ||
    !bookedTimeSlots?.to ||
    !totalDays ||
    !totalAmount
  ) {
    throw new Error("Missing required fields");
  }

  if (!phone) {
    throw new Error("Please Enter Mobile Number");
  }

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const bike = await Ride.findById(bikeId);
  if (!bike) throw new Error("Bike got out of stock");

  const newBooking = new Booking({
    userId,
    bikeId,
    bookedTimeSlots,
    totalDays,
    totalAmount,
    status: status || "Pending",
    addressInfo,
    dl,
    phone,
  });

  await newBooking.save();

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Ride Flow Rentals" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Thank You for Booking with Us!",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Booking Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        color: #fff;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #222;
        color: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding: 20px;
        border-bottom: 1px solid #ddd;
      }
      .header img {
        max-width: 140px;
      }
      .body {
        padding: 20px;
        color: #fff;
        line-height: 1.5;
        font-size: 14px;
      }
      .body p {
        margin-bottom: 15px;
      }
      .body .highlight {
        color: #ffa600;
        font-weight: bold;
      }
      .body .bike-image {
        padding: 5px;
        text-align: center;
        margin: 20px 0;
      }
      .body .bike-image img {
        width: 90%;
        height: auto;
        border-radius: 8px;
      }
      .details-list {
        list-style: none;
        padding: 0;
        margin: 0 0 20px;
      }
      .details-list li {
        font-size: 14px;
        margin-bottom: 10px;
      }
      .details-list li b {
        color: #ffa600;
      }
      .thank-you {
        text-align: center;
        font-style: italic;
        margin-top: 20px;
      }
      .footer {
        background-color: #222;
        color: #fff;
        text-align: center;
        font-size: 12px;
        margin-bottom: 30px;
      }
      .footer a {
        color: #ffa600;
        text-decoration: none;
      }
      .footer a:hover {
        text-decoration: underline;
      }
      .output {
        text-transform: capitalize;
      }
      .dloutput {
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img
          src="http://res.cloudinary.com/dulkmeadg/image/upload/v1735155737/pph48xmmwykrbhle7uzo.png"
          alt="RideFlow Logo"
        />
      </div>
      <div class="body">
        <p>Dear <span class="highlight output"> ${user.userName.replace(
          /(_\d+)$/,
          ""
        )}</span>,</p>
        <p>
          Your booking for the bike
          <b class="highlight output">${bike.rideName}'s</b> has been placed
          successfully. Below are your booking details:
        </p>
        <div class="bike-image">
          <img src="${bike.image}" alt="Bike Image" />
        </div>
        <ul class="details-list">
          <li>
            <b>Bike Name: </b> <span class="output">${bike.rideName}</span>
          </li>
          <li><b>Brand: </b> <span class="output">${bike.brand}</span></li>
          <li><b>DL: </b> <span class="dloutput">${dl}</span></li>
          <li><b>Phone No.: </b> ${phone}</li>
          <li><b>Pick Up: </b> ${bookedTimeSlots.from}</li>
          <li><b>Drop Off: </b> ${bookedTimeSlots.to}</li>
          <li><b>Total Days: </b> ${totalDays}</li>
          <li><b>Total Amount: </b> ₹ ${totalAmount}</li>
        </ul>
        <p class="thank-you">
          Thank you for choosing RideFlow. Have a safe and enjoyable ride!
        </p>
      </div>
      <div class="footer">
        &copy; 2025 <a href="#">RideFlow Rentals</a>. All rights reserved.
      </div>
    </div>
  </body>
</html>

`,
  });

  return newBooking;
};

const bookRide = async (req, res) => {
  try {
    const booking = await createBooking(req.body);
    return res.status(201).json({
      success: true,
      message: "Your Booking Placed successfully",
      booking,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

// const bookRide = async (req, res) => {
//   try {
//     const {
//       userId,
//       bikeId,
//       bookedTimeSlots,
//       totalDays,
//       totalAmount,
//       status,
//       addressInfo,
//       dl,
//       phone,
//     } = req.body;

//     if (
//       !userId ||
//       !bikeId ||
//       !bookedTimeSlots.from ||
//       !bookedTimeSlots.to ||
//       !totalDays ||
//       !totalAmount
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields",
//       });
//     }
//     // if (!dl) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: "Please Enter Driving Licence Number",
//     //   });
//     // }
//     if (!phone) {
//       return res.status(400).json({
//         success: false,
//         message: "Please Enter Mobile Number",
//       });
//     }

//     // const dlRegex = /^[A-Za-z]{2}[0-9]{2}(?: [0-9]{11}|[A-Za-z][0-9]{11})$/;

//     // if (!dlRegex.test(dl)) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: "Invalid Driving Licence format! Use RJ14D00000000000.",
//     //   });
//     // }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: true,
//         message: "User not found",
//       });
//     }

//     const bike = await Ride.findById(bikeId);
//     if (!bike) {
//       return res.status(404).json({
//         success: false,
//         message: "Bike got out of Stock",
//       });
//     }

//     const newBooking = new Booking({
//       userId,
//       bikeId,
//       bookedTimeSlots,
//       totalDays,
//       totalAmount,
//       status: status || "Pending",
//       addressInfo,
//       dl,
//       phone,
//     });

//     await newBooking.save();

//     // Nodemailer setup
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Ride Flow Rentals" <${process.env.EMAIL_USER}>`,
//       to: user.email,
//       subject: "Thank You for Booking with Us!",
//       html: `<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Booking Confirmation</title>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         margin: 0;
//         padding: 0;
//         color: #fff;
//       }
//       .container {
//         max-width: 600px;
//         margin: 20px auto;
//         background-color: #222;
//         color: #fff;
//         border: 1px solid #ddd;
//         border-radius: 8px;
//         overflow: hidden;
//         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//       }
//       .header {
//         text-align: center;
//         padding: 20px;
//         border-bottom: 1px solid #ddd;
//       }
//       .header img {
//         max-width: 140px;
//       }
//       .body {
//         padding: 20px;
//         color: #fff;
//         line-height: 1.5;
//         font-size: 14px;
//       }
//       .body p {
//         margin-bottom: 15px;
//       }
//       .body .highlight {
//         color: #ffa600;
//         font-weight: bold;
//       }
//       .body .bike-image {
//         padding: 5px;
//         text-align: center;
//         margin: 20px 0;
//       }
//       .body .bike-image img {
//         width: 90%;
//         height: auto;
//         border-radius: 8px;
//       }
//       .details-list {
//         list-style: none;
//         padding: 0;
//         margin: 0 0 20px;
//       }
//       .details-list li {
//         font-size: 14px;
//         margin-bottom: 10px;
//       }
//       .details-list li b {
//         color: #ffa600;
//       }
//       .thank-you {
//         text-align: center;
//         font-style: italic;
//         margin-top: 20px;
//       }
//       .footer {
//         background-color: #222;
//         color: #fff;
//         text-align: center;
//         font-size: 12px;
//         margin-bottom: 30px;
//       }
//       .footer a {
//         color: #ffa600;
//         text-decoration: none;
//       }
//       .footer a:hover {
//         text-decoration: underline;
//       }
//       .output {
//         text-transform: capitalize;
//       }
//       .dloutput {
//         text-transform: uppercase;
//       }
//     </style>
//   </head>
//   <body>
//     <div class="container">
//       <div class="header">
//         <img
//           src="http://res.cloudinary.com/dulkmeadg/image/upload/v1735155737/pph48xmmwykrbhle7uzo.png"
//           alt="RideFlow Logo"
//         />
//       </div>
//       <div class="body">
//         <p>Dear <span class="highlight output"> ${user.userName.replace(
//           /(_\d+)$/,
//           ""
//         )}</span>,</p>
//         <p>
//           Your booking for the bike
//           <b class="highlight output">${bike.rideName}'s</b> has been placed
//           successfully. Below are your booking details:
//         </p>
//         <div class="bike-image">
//           <img src="${bike.image}" alt="Bike Image" />
//         </div>
//         <ul class="details-list">
//           <li>
//             <b>Bike Name: </b> <span class="output">${bike.rideName}</span>
//           </li>
//           <li><b>Brand: </b> <span class="output">${bike.brand}</span></li>
//           <li><b>DL: </b> <span class="dloutput">${dl}</span></li>
//           <li><b>Phone No.: </b> ${phone}</li>
//           <li><b>Pick Up: </b> ${bookedTimeSlots.from}</li>
//           <li><b>Drop Off: </b> ${bookedTimeSlots.to}</li>
//           <li><b>Total Days: </b> ${totalDays}</li>
//           <li><b>Total Amount: </b> ₹ ${totalAmount}</li>
//         </ul>
//         <p class="thank-you">
//           Thank you for choosing RideFlow. Have a safe and enjoyable ride!
//         </p>
//       </div>
//       <div class="footer">
//         &copy; 2025 <a href="#">RideFlow Rentals</a>. All rights reserved.
//       </div>
//     </div>
//   </body>
// </html>

// `,
//     });
//     res.status(201).json({
//       success: true,
//       message: "Your Booking Placed successfully",
//       booking: newBooking,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server error. Please try again.",
//     });
//   }
// };

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

const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;

    if (!["Pending", "Confirmed", "Cancelled", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

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

const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

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

module.exports = {
  bookRide,
  getAllBookings,
  getUserBookings,
  updateBookingStatus,
  deleteBooking,
  createBooking,
};
