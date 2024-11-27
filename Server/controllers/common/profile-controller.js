// const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const User = require("../../models/User");

// Get user profile
const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }

    // Find the user by ID
    const user = await User.findById(userId).select("-password"); // Exclude password field if stored

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update user profile
// const updateProfile = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { name, phone, dob } = req.body;

//   try {
//     const userId = req.user.id;
//     let user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Update fields
//     if (name) user.name = name;
//     if (phone) user.phone = phone;
//     if (dob) user.dob = dob;

//     await user.save();
//     res.status(200).json({ message: "Profile updated successfully", user });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Delete user profile
// const deleteProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     await User.findByIdAndDelete(userId);
//     res.status(200).json({ message: "Profile deleted successfully" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

module.exports = {
  getProfile,
};
