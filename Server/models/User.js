const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"], // Basic email validation
    },
    password: {
      type: String,
      required: function () {
        // Password is required only if there is no googleId (i.e. for email-based authentication)
        return !this.googleId;
      },
    },
    googleId: {
      type: String,
      required: false,
      unique: true, // Ensure googleId is unique
    },
    role: {
      type: String,
      default: "user",
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
