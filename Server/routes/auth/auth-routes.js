const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const dotenv = require("dotenv");
dotenv.config();

const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  googleAuth,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/google-login", googleAuth);

router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;
