const User = require("../../models/User");

const dotenv = require("dotenv");
dotenv.config();

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      return res.status(404).json({ message: "No Users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error. Please try again.",
      error: error.message, // Include the error message
    });
  }
};

module.exports = {
  getAllUsers,
};
