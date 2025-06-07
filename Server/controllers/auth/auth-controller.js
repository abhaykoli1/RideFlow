const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const PendingUser = require("../../models/pendingUser");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

dotenv.config();

const nodemailer = require("nodemailer");
const crypto = require("crypto");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser =
      (await User.findOne({ email })) || (await PendingUser.findOne({ email }));
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email! Please try again",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }
    let uniqueUserName = userName;
    let counter = 1;
    while (
      (await User.findOne({ userName: uniqueUserName })) ||
      (await PendingUser.findOne({ userName: uniqueUserName }))
    ) {
      uniqueUserName = `${userName}_${counter}`;
      counter++;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpires = Date.now() + 3600000;

    const pendingUser = new PendingUser({
      userName: uniqueUserName,
      email,
      password: hashedPassword,
      verificationToken,
      tokenExpires,
    });

    await pendingUser.save();
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationUrl = `${process.env.CLIENT_URL}/auth/verify-email/${verificationToken}`;

    await transporter.sendMail({
      from: `"Ride Flow Rentals" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "RideFlow Rentals | Login Verification",
      html: `
     <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
       color: #ffff;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #222;
      color: #ffff;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #ddd; 
    }
    .header img {
      max-width: 140px;
    }
    .body {
      padding: 20px;
      color: #ffff;
      line-height: 1.5;
      font-size : 14px;
    }
    .body .nameCon{
      font-size: 15px;
    }
    .body .name {
      color: #ffa600;
    }
    .button-container {
      text-align: center;
      margin: 20px 0;
    }
    .button {
      margin: 10px ;
      background-color: #ffffff;
      color: #ffa600;
      text-decoration: none;
      padding: 8px 20px;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      display: inline-block;
    }
    .footer {
     border-top: 1px solid #ddd; 
       background-color: #222;
       color: #ffff;
      text-align: center;
      font-size: 12px;
      padding: 10px;
    }
    .footer a {
      color: #ffa600 ;
      text-decoration: none;
    }
      .footer p {
      color: #fffff ;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    .we{
      text-align: center;
    }
    .thank {
      text-align: center;
      font-style: italic;
    }
      .output {
        text-transform: capitalize;
      }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="http://res.cloudinary.com/dulkmeadg/image/upload/v1735155737/pph48xmmwykrbhle7uzo.png" alt="RideFlow Logo" />
    </div>
    <div class="body">
      <p class="nameCon"><strong>Hi</strong><strong class="name output"> ${userName}</strong>,</p>
      <p>Thank you for signing up for RideFlow, your trusted bike rental service!</p>
      <p>To complete your registration and start riding, please verify your email address by pressing the button below:</p>
      <div class="button-container">
        <a href="${verificationUrl}" class="button">Verify Email</a>
      </div>
      <p class="we">We can’t wait to get you started on your journey with RideFlow!</p>
      <p class="thank">Thank you for choosing us!</p>
    </div>
    <div class="footer">
      <p>If you didn't sign up for RideFlow, please ignore this email or <a href="https://api.whatsapp.com/send/?phone=9887434494">contact us</a>.</p>
      <p>&copy; 2024 RideFlow. All rights reserved.</p>
    </div>
  </div>
</body>
</html>

     `,
    });

    res.status(200).json({
      success: true,
      message: "Please check your email to verify your account.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred during registration.",
    });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const pendingUser = await PendingUser.findOne({
      verificationToken: token,
      tokenExpires: { $gt: Date.now() },
    });

    if (!pendingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification link.",
      });
    }

    const { userName, email, password } = pendingUser;

    const newUser = new User({
      userName,
      email,
      password,
      image: userName[0],
    });

    await newUser.save();

    await PendingUser.deleteOne({ _id: pendingUser._id });

    const authToken = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
        email: newUser.email,
        userName: newUser.userName,
        image: newUser.userName[0],
      },
      process.env.CLIENT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION_TIME }
    );

    res
      .cookie("token", authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: "Email verified successfully!",
        user: {
          email: newUser.email,
          role: newUser.role,
          id: newUser._id,
          userName: newUser.userName,
          image: newUser.userName[0],
        },
      });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "An error occurred during verification",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // console.log("body", email);

  try {
    const checkUser = await User.findOne({ email });
    const pendingUser = await PendingUser.findOne({ email });

    if (!checkUser && !pendingUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist! Please register first.",
      });
    }

    if (pendingUser) {
      return res.status(400).json({
        success: false,
        message:
          "This email is already in the verification process. Please check your inbox.",
      });
    }

    if (checkUser.googleId && !checkUser.password) {
      return res.status(403).json({
        success: false,
        message:
          "This account is linked with Google. Use sign in with google or change password",
      });
    }

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

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
        image: checkUser.userName[0],
      },
      process.env.CLIENT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION_TIME }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
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
    console.error("Login error:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred during login",
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

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

const fetchAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password -__v");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    next(err);
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required.",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this email.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = Date.now() + 3600000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = tokenExpiry;

    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const logo =
      "https://drive.google.com/file/d/18RCIU6TMcB5YqcKJ5bBnsC_9kallIkxR/view?usp=drive_link";
    await transporter.sendMail({
      from: `"Ride Flow Rentals" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request for Ride Flow",
      html: `
        <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
       color: #ffff;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #222;
      color: #ffff;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #ddd; 
    }
    .header img {
      max-width: 140px;
    }
    .body {
      padding: 20px;
      color: #ffff;
      line-height: 1.5;
      font-size : 14px;
    }
    .body .nameCon{
      font-size: 15px;
    }
    .body .name {
      color: #ffa600;
    }
    .button-container {
      text-align: center;
      margin-top: 20px;
    }
    .button {
      margin-top: 10px ;
      background-color: #ffffff;
      color: #ffa600;
      text-decoration: none;
      padding: 8px 20px;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      display: inline-block;
    }
    .footer {
       background-color: #222;
       color: #ffff;
      text-align: center;
      font-size: 12px;
      padding: 10px;
    }
    .footer a {
      color: #ffa600 ;
      text-decoration: none;
    }
      .footer p {
      color: #fffff ;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    .we{
      text-align: center;
    }
    .thank {
      text-align: center;
      font-style: italic;
    }
    .output {
        text-transform: capitalize;
    }
  </style>
            </head>
          
<body>
  <div class="container">
    <div class="header">
      <img src="http://res.cloudinary.com/dulkmeadg/image/upload/v1735155737/pph48xmmwykrbhle7uzo.png" alt="RideFlow Logo" />
    </div>
    <div class="body">
      <p class="nameCon"><strong>Hi</strong><strong class="name output"> ${user.userName.replace(
        /(_\d+)$/,
        ""
      )}</strong>,</p>
       <p>If you've forgotten your password or need to make changes, your <b>RideFlow</b> password can be quickly and easily reset. Simply click the button below.</p>
      <div class="button-container">
        <a href="${resetLink}" class="button">Reset Password</a>
      </div>
    
    </div>
    <div class="footer">
      <p>If you did not request the new password, please ignore this email or <a href="https://api.whatsapp.com/send/?phone=9887434494">contact us</a>.</p>
      <p>&copy; 2024 RideFlow. All rights reserved.</p>
    </div>
  </div>
</body>
            </html>

      `,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent. Please check your inbox.",
    });
  } catch (error) {
    console.error("Error in requestPasswordReset:", error);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while sending the password reset email. Please try again later.",
    });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  // Check if token and newPassword are provided
  if (!token || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "password is required.",
    });
  }

  // Check if the password meets the minimum length requirement
  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long.",
    });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Token expiration check
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user with new password and clear reset token data
    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // Remove reset token
    user.resetPasswordExpires = undefined; // Remove reset token expiration time

    // Save updated user data
    await user.save();

    // Respond with success message
    res.status(200).json({
      success: true,
      message:
        "Password has been reset successfully. You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while resetting the password. Please try again later.",
    });
  }
};

const googleAuth = async (req, res) => {
  const { tokenId } = req.body;

  if (!tokenId) {
    return res
      .status(400)
      .json({ success: false, message: "Token ID is required" });
  }

  try {
    // Verify Google ID Token
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    let pendingUser = await PendingUser.findOne({ email });
    if (pendingUser) {
      return res.status(400).json({
        success: false,
        message:
          "This email is already in the verification process. Please check your inbox.",
      });
    }

    // Find or create user
    let user =
      (await User.findOne({ googleId: sub })) ||
      (await User.findOne({ email }));

    if (user) {
      if (!user.googleId) {
        user.googleId = sub; // Link Google account to existing user
        await user.save();
      } else if (user.email !== email) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email! Use a different email",
        });
      }
    } else {
      user = await createNewUser(email, name, sub, picture);
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        image: picture,
        userName: user.userName,
      },
      process.env.CLIENT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION_TIME }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          email: user.email,
          role: user.role,
          id: user._id,
          userName: user.userName,
          image: picture,
        },
      });
  } catch (error) {
    console.error("Google Authentication Error:", error.stack);
    res.status(500).json({ success: false, message: error });
  }
};

// Helper Function to Create New User
const createNewUser = async (email, name, googleId, picture) => {
  let userName = name;
  const existingUsers = await User.find({
    userName: new RegExp(`^${name}(_\\d+)?$`),
  });

  if (existingUsers.length) {
    const counter = existingUsers.length + 1;
    userName = `${name}_${counter}`;
  }

  const user = new User({
    email,
    role: "user",
    userName,
    googleId,
    image: picture,
  });

  await user.save();
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  googleAuth,
  fetchAllUsers,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
};
