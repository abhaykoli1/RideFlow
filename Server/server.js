// const express = require("express");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const session = require("express-session");

// // Load environment variables
// const dotenv = require("dotenv");
// dotenv.config();

// // Connect to the database
// connectDB();

// // Import routes
// const authRouter = require("./routes/auth/auth-routes");
// const adminRidesRouter = require("./routes/admin/Rides-routes");
// const adminReviewsRouter = require("./routes/admin/Reviews-routes");
// const userRidesRouter = require("./routes/user/Rides-routes");
// const userCartRouter = require("./routes/user/cart-routes");
// const userWishlistRouter = require("./routes/user/wishlist-routes");
// const userAddressRouter = require("./routes/user/address-routes");
// const UserContactRouter = require("./routes/user/contact-routes");
// const userBookingRouter = require("./routes/user/booking-routes");

// const app = express();
// const PORT = process.env.PORT || 8000;
// app.use(cookieParser());
// app.use(express.json());

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// // Middleware
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "Cache-Control",
//       "Expires",
//       "Pragma",
//     ],
//     credentials: true,
//   })
// );

// // Route handling
// app.use("/api/auth", authRouter);
// app.use("/api/admin/Rides", adminRidesRouter);
// app.use("/api/admin/Reviews", adminReviewsRouter);
// app.use("/api/user/Rides", userRidesRouter);
// app.use("/api/user/cart", userCartRouter);
// app.use("/api/user/wishlist", userWishlistRouter);
// app.use("/api/user/address", userAddressRouter);
// app.use("/api/user/contact", UserContactRouter);
// app.use("/api/user/booking", userBookingRouter);

// // Start the server
// app.listen(PORT, () => console.log(`Server is now running on Post ${PORT}`));

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const connectDB = require("./config/db"); // Import the DB connection function
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import routes
const authRouter = require("./routes/auth/auth-routes");
const adminRidesRouter = require("./routes/admin/Rides-routes");
const adminReviewsRouter = require("./routes/admin/Reviews-routes");
const userRidesRouter = require("./routes/user/Rides-routes");
const userCartRouter = require("./routes/user/cart-routes");
const userWishlistRouter = require("./routes/user/wishlist-routes");
const userAddressRouter = require("./routes/user/address-routes");
const UserContactRouter = require("./routes/user/contact-routes");
const userBookingRouter = require("./routes/user/booking-routes");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to the database
connectDB();

// Middleware
app.use(cookieParser());
app.use(express.json());

// Session configuration using MongoDB store
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key", // Session secret from .env file
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // MongoDB URI for session storage
      ttl: 14 * 24 * 60 * 60, // Session expiration time (14 days)
    }),
  })
);

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allowed origin for CORS requests
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true, // Allow credentials (cookies, headers)
  })
);

// Route handling
app.use("/api/auth", authRouter);
app.use("/api/admin/Rides", adminRidesRouter);
app.use("/api/admin/Reviews", adminReviewsRouter);
app.use("/api/user/Rides", userRidesRouter);
app.use("/api/user/cart", userCartRouter);
app.use("/api/user/wishlist", userWishlistRouter);
app.use("/api/user/address", userAddressRouter);
app.use("/api/user/contact", UserContactRouter);
app.use("/api/user/booking", userBookingRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
