const express = require("express");
const { getProfile } = require("../../controllers/common/profile-controller");

const router = express.Router();

router.get("/get/:userId", getProfile);

// const { check } = require("express-validator");
// const authMiddleware = require("../../controllers/auth"); // Assuming you have an auth middleware
// router.put(
//   "/",
//   [
//     authMiddleware,
//     check("phone", "Please provide a valid phone number")
//       .optional()
//       .isMobilePhone(),
//     check("dob", "Please provide a valid date of birth").optional().isISO8601(),
//   ],
//   updateProfile
// );
// router.delete("/", authMiddleware, deleteProfile);

module.exports = router;
