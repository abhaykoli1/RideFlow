// const mongoose = require("mongoose");
// require("dotenv").config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Connect to MongoDB (removed deprecated options)
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = connectDB;
