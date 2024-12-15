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

//login user
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

// Fetch All Users (Admin)
const fetchAllUsers = async (req, res) => {
  try {
    // Check if the requesting user is an admin
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    // Fetch all users from the database
    const users = await User.find({}, "-password -__v"); // Exclude sensitive fields like password and version key

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users. Please try again later.",
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
        user = new User({
          email,
          userName: name,
          googleId: sub,
          image: picture,
        });

        const existingUserName = await User.findOne({ userName: name });

        if (existingUserName) {
          let counter = 1;
          let newUserName = `${name}_${counter}`;

          while (await User.findOne({ userName: newUserName })) {
            counter++;
            newUserName = `${name}_${counter}`;
          }
          user.userName = newUserName;
        }

        await user.save();
      } else {
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
  fetchAllUsers,
};

// Required Dependencies
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// const rateLimit = require("express-rate-limit");
// const { OAuth2Client } = require("google-auth-library");
// const User = require("../../models/User");

// // Load environment variables
// dotenv.config();

// const router = express.Router();
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // Middleware for Parsing Cookies
// router.use(cookieParser());

// // Rate Limiter for Authentication Routes
// const authLimiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 5, // Limit each IP to 5 requests per window
//   message: "Too many requests. Please try again later.",
// });

// // Helper: Generate JWT Token
// const generateToken = (user) => {
//   return jwt.sign(
//     {
//       id: user._id,
//       email: user.email,
//       userName: user.userName,
//       role: user.role,
//     },
//     process.env.CLIENT_SECRET_KEY,
//     { expiresIn: "60m" }
//   );
// };

// // Middleware: Authentication
// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized user! Please log in.",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message:
//         error.name === "TokenExpiredError"
//           ? "Session expired. Please log in again."
//           : "Invalid token.",
//     });
//   }
// };

// // Route: Register User
// router.post("/register", async (req, res) => {
//   const { userName, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists with the same email!",
//       });
//     }

//     if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 6 characters and include a number.",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const newUser = new User({
//       userName,
//       email,
//       password: hashedPassword,
//       image: userName[0],
//     });

//     await newUser.save();
//     res.status(201).json({
//       success: true,
//       message: "Registration successful",
//     });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred. Please try again.",
//     });
//   }
// });

// // Route: Login User
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found. Please register first.",
//       });
//     }

//     if (user.googleId) {
//       return res.status(403).json({
//         success: false,
//         message: "Account is linked with Google. Use Google login.",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Incorrect password.",
//       });
//     }

//     const token = generateToken(user);
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//     });

//     res.json({
//       success: true,
//       message: "Login successful",
//       user: {
//         email: user.email,
//         userName: user.userName,
//         role: user.role,
//         id: user._id,
//       },
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred. Please try again.",
//     });
//   }
// });

// // Route: Google Login
// router.post("/google-login", authLimiter, async (req, res) => {
//   const { tokenId } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: tokenId,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const { sub, email, name, picture } = ticket.getPayload();
//     let user = await User.findOne({ googleId: sub });

//     if (!user) {
//       user = await User.findOne({ email });

//       if (!user) {
//         user = new User({
//           userName: name,
//           email,
//           googleId: sub,
//           image: picture,
//         });

//         const baseName = name.replace(/\s+/g, "_");
//         const uniqueSuffix = Date.now();
//         user.userName = `${baseName}_${uniqueSuffix}`;

//         await user.save();
//       } else if (!user.googleId) {
//         user.googleId = sub;
//         await user.save();
//       }
//     }

//     const token = generateToken(user);
//     res.cookie("token", token, { httpOnly: true });
//     res.json({
//       success: true,
//       message: "Google login successful",
//       user,
//     });
//   } catch (error) {
//     console.error("Google login error:", error);
//     res.status(400).json({
//       success: false,
//       message: "Google login failed",
//     });
//   }
// });

// // Route: Logout
// router.post("/logout", (req, res) => {
//   res.clearCookie("token").json({
//     success: true,
//     message: "Logged out successfully",
//   });
// });

// // Route: Fetch All Users (Admin Only)
// router.get("/users", authMiddleware, async (req, res) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({
//       success: false,
//       message: "Admin privileges required.",
//     });
//   }

//   try {
//     const users = await User.find({}, "-password -__v");
//     res.status(200).json({
//       success: true,
//       users,
//     });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch users.",
//     });
//   }
// });

// module.exports = router;
