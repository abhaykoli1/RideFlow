const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const session = require("express-session");
const connectDB = require("./config/db");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Import routes
const authRouter = require("./routes/auth/auth-routes");
const usersRouter = require("./routes/common/users-routers");
// const usersRouter = require("./routes/admin/Users-routes");
const adminRidesRouter = require("./routes/admin/Rides-routes");
const adminReviewsRouter = require("./routes/admin/Reviews-routes");
const userRidesRouter = require("./routes/user/Rides-routes");
const userAddressRouter = require("./routes/user/address-routes");
const UserContactRouter = require("./routes/user/contact-routes");
const userBookingRouter = require("./routes/user/booking-routes");
const DashboardRouter = require("./routes/common/dashboard-routes");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to the database
connectDB();

// Middleware
app.use(cookieParser());
app.use(express.json());

// Session configuration using MongoDB store
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "your-secret-key",
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URI, // MongoDB URI for session storage
//       ttl: 14 * 24 * 60 * 60, // Session expiration time (14 days)
//     }),
//   })
// );

app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allowed origin for CORS requests
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// Route handling
app.use("/api/auth", authRouter);
app.use("api/users", usersRouter);

// app.use("/api/admin/users", usersRouter);
app.use("/api/admin/Rides", adminRidesRouter);
app.use("/api/dashboard", DashboardRouter);

app.use("/api/admin/Reviews", adminReviewsRouter);
app.use("/api/user/Rides", userRidesRouter);
app.use("/api/user/address", userAddressRouter);
app.use("/api/contact", UserContactRouter);
app.use("/api/booking", userBookingRouter);

app.use("/static", express.static(path.join(__dirname, "public")));
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
