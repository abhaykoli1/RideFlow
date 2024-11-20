const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");
dotenv.config();

// Register User (Email-based)
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.status(400).json({
        success: false,
        message: "User already exists with the same email! Please try again",
      });

    // Password validation (optional, but recommended)
    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      image: userName[0],
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred during registration",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    }

    // If user has a Google ID, block login with a password
    if (checkUser.googleId) {
      return res.status(403).json({
        success: false,
        message:
          "This account is linked with Google. Please log in using Google authentication.",
      });
    }

    // If the user is logging in with a password (email-based)
    if (checkUser.password) {
      const checkPasswordMatch = await bcrypt.compare(
        password,
        checkUser.password
      );
      if (!checkPasswordMatch) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password! Please try again",
        });
      }
    }

    // Generate JWT token for successful login
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
        image: checkUser.userName[0],
      },
      process.env.CLIENT_SECRET_KEY,
      { expiresIn: "60m" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensures cookies are secure only in production
      })
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
          userName: checkUser.userName,
          image: checkUser.userName[0],
        },
      });
  } catch (e) {
    console.error("Login error:", e); // Log more details about the error
    res.status(500).json({
      success: false,
      message: "Some error occurred during login",
    });
  }
};

// Logout User
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

// Auth Middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });

  try {
    const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Session expired. Please log in again."
          : "Unauthorized user! Invalid token.",
    });
  }
};

// Initialize Google OAuth2 client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = async (req, res) => {
  const { tokenId } = req.body;

  try {
    // Verify the tokenId with Google
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    // Check if the user exists in your database by googleId
    let user = await User.findOne({ googleId: sub });

    if (!user) {
      // Check if the email already exists
      user = await User.findOne({ email });

      if (!user) {
        // If the user doesn't exist by email or googleId, create a new user
        user = new User({
          email,
          userName: name, // Keep the name as it is from Google
          googleId: sub,
          image: picture, // Save the image URL here
        });

        // Check if the userName already exists, if so, append a number to make it unique
        const existingUserName = await User.findOne({ userName: name });

        if (existingUserName) {
          let counter = 1;
          let newUserName = `${name}_${counter}`;

          // Keep checking until we find a unique username
          while (await User.findOne({ userName: newUserName })) {
            counter++;
            newUserName = `${name}_${counter}`;
          }

          user.userName = newUserName; // Assign the new unique userName
        }

        await user.save();
      } else {
        // If the user with the same email exists, just update the googleId if it's not there
        if (!user.googleId) {
          user.googleId = sub;
          await user.save();
        }
      }
    }

    // Create a JWT token for your own authentication
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        userName: user.userName,
        image: user.image,
      },
      process.env.CLIENT_SECRET_KEY,
      { expiresIn: "60m" }
    );

    res
      .cookie("token", token, { httpOnly: true })
      .json({ success: true, message: "Logged in successfully", user });
  } catch (error) {
    console.error("Google Authentication Error:", error);
    res.status(400).json({ success: false, message: "Google login failed" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  googleAuth,
};
