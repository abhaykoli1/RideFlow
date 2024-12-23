const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const PendingUser = require("../../models/pendingUser");

dotenv.config();

const nodemailer = require("nodemailer");
const crypto = require("crypto");

// const registerUser = async (req, res) => {
//   const { userName, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists.",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const verificationToken = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit code
//     const verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // Expires in 24 hours

//     const pendingUser = new PendingUser({
//       userName,
//       email,
//       password: hashedPassword,
//       verificationToken,
//       verificationTokenExpiry,
//     });

//     await pendingUser.save();

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: " Complete Your Registration – Verify Your Email RideFlow",
//       html: `
//           <!DOCTYPE html>
// <html>
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Verify Your Email</title>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         margin: 0;
//         padding: 0;
//         background-color: #f4f4f4;
//       }
//       .email-container {
//         max-width: 600px;
//         margin: 20px auto;
//         background: #ffffff;
//         padding: 20px;
//         border-radius: 10px;
//         box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//       }
//       .header {
//         text-align: center;
//         padding-bottom: 20px;
//         border-bottom: 1px solid #ddd;
//       }
//       .header h1 {
//         color: #333;
//         font-size: 24px;
//       }
//       .content {
//         padding: 20px;
//         text-align: center;
//       }
//       .otp {
//         font-size: 32px;
//         font-weight: bold;
//         color: #007bff;
//         letter-spacing: 10px;
//         margin: 20px 0;
//       }
//       .footer {
//         text-align: center;
//         padding: 20px;
//         font-size: 12px;
//         color: #666;
//         border-top: 1px solid #ddd;
//       }
//       .button {
//         display: inline-block;
//         padding: 10px 20px;
//         background-color: #007bff;
//         color: #fff;
//         text-decoration: none;
//         border-radius: 5px;
//         font-size: 16px;
//         margin-top: 20px;
//       }
//       .button:hover {
//         background-color: #0056b3;
//       }
//     </style>
//   </head>
//   <body>
//     <div class="email-container">
//       <div class="header">
//         <h1>Verify Your Email</h1>
//       </div>
//       <div class="content">
//          <p>Hi <strong class="name">${userName}</strong>,</p>
//         <p>
//           Thank you for signing up! To complete your registration, please use
//           the verification code below:
//         </p>
//         <div class="otp">${verificationToken}</div>
//         <p style="margin-top: 20px;">This code is valid for the next 10 minutes.</p>
//         <p>
//           If you did not request this verification, please ignore this email or
//           contact our support team for help.
//         </p>

//       </div>
//       <div class="footer">
//         <p>Need help? Contact us at support@example.com.</p>
//         <p>&copy; 2024 RideFLow. All Rights Reserved.</p>
//       </div>
//     </div>
//   </body>
// </html>
//       `,
//     });

//     // <!DOCTYPE html>
//     // <html>
//     // <head>
//     //   <style>
//     //     body {
//     //       font-family: Arial, sans-serif;
//     //       background-color: #f4f4f4;
//     //       margin: 0;
//     //       padding: 0;
//     //     }
//     //     .container {
//     //       max-width: 600px;
//     //       margin: 20px auto;
//     //       background-color: #ffffff;
//     //       border: 1px solid #dddddd;
//     //       border-radius: 8px;
//     //       overflow: hidden;
//     //     }
//     //     .header {
//     //       background-color: #ffa600;
//     //       color: #ffffff;
//     //       text-align: center;
//     //       padding: 20px;
//     //       font-size: 24px;
//     //       font-weight: bold;
//     //     }
//     //     .body {
//     //       padding: 20px;
//     //       color: #fff;
//     //       font-size: 16px;
//     //       line-height: 1.6;
//     //     }
//     //     .button-container {
//     //       text-align: center;
//     //       font-weight: bold;
//     //       color: #ffffff;
//     //        font-size: 20px;
//     //       margin: 20px 0;
//     //     }
//     //     .button {
//     //       background-color: #ffa600;
//     //       color: #ffffff;
//     //       font-weight: bold;
//     //       padding: 10px 20px;
//     //       text-decoration: none;
//     //       font-size: 18px;
//     //       border-radius: 5px;
//     //       display: inline-block;
//     //     }
//     //     .button:hover {
//     //       background-color: #219150;
//     //     }
//     //     .footer {
//     //       background-color: #f4f4f4;
//     //       text-align: center;
//     //       padding: 10px;
//     //       font-size: 14px;
//     //       color: #666666;
//     //     }
//     //     .footer a {
//     //       color: #27ae60;
//     //       text-decoration: none;
//     //     }
//     //       .name{

//     //       }
//     //        .thank {
//     //        margin-top:
//     //          text-align: center;
//     //        }

//     //   </style>
//     // </head>
//     // <body>
//     //   <div class="container">
//     //     <div class="header">
//     //       Welcome to RideFlow Rentals!
//     //     </div>
//     //     <div class="body">
//     //       <p>Hi <strong class="name">${userName}</strong>,</p>
//     //       <p>Thank you for signing up for RideFlow, your trusted bike rental service!</p>
//     //       <p>To complete your registration and start riding, please verify your email address by using the code below:</p>
//     //       <div class="button-container">
//     //       ${verificationToken}
//     //       </div>
//     //       <p>We can’t wait to get you started on your journey with RideFlow!</p>
//     //       <p class="thank">Thank you for choosing us!</p>
//     //     </div>
//     //     <div class="footer">
//     //       <p>If you didn't sign up for RideFlow,</p>
//     //        <p> please ignore this email  or <a href="mailto:support@RideFlow.com">contact us</a>.</p>
//     //       <p>&copy; 2024 RideFlow. All rights reserved.</p>
//     //     </div>
//     //   </div>
//     // </body>
//     // </html>

//     res.status(200).json({
//       success: true,
//       message: "Registration successful! Please verify your email.",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred during registration.",
//     });
//   }
// };

// const verifyEmail = async (req, res) => {
//   const { email, code } = req.body;

//   try {
//     const pendingUser = await PendingUser.findOne({
//       email,
//       verificationToken: code,
//       verificationTokenExpiry: { $gt: Date.now() },
//     });

//     if (!pendingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired verification code.",
//       });
//     }

//     const newUser = new User({
//       userName: pendingUser.userName,
//       image: pendingUser.userName[0],
//       role: "user",
//       email: pendingUser.email,
//       password: pendingUser.password,
//     });

//     await newUser.save();

//     await PendingUser.deleteOne({ email });

//     const token = jwt.sign(
//       {
//         id: newUser._id,
//         role: newUser.role,
//         image: newUser.userName[0],
//         email: newUser.email,
//         userName: newUser.userName,
//       },
//       process.env.CLIENT_SECRET_KEY,
//       { expiresIn: process.env.JWT_EXPIRATION_TIME }
//     );

//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//       })
//       .json({
//         success: true,
//         message: "Email verified successfully and logged in!",
//         user: {
//           id: newUser._id,
//           role: newUser.role,
//           image: newUser.userName[0],
//           email: newUser.email,
//           userName: newUser.userName,
//         },
//       });
//   } catch (error) {
//     console.error("Email verification error:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred during email verification.",
//     });
//   }
// };

// const registerUser = async (req, res) => {
//   const { userName, email, password } = req.body;

//   try {
//     const checkUser = await User.findOne({ email });
//     if (checkUser)
//       return res.status(400).json({
//         success: false,
//         message: "User already exists with the same email! Please try again",
//       });

//     if (password.length < 6)
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 6 characters long",
//       });
//     let uniqueUserName = userName;
//     let counter = 1;
//     while (await User.findOne({ userName: uniqueUserName })) {
//       uniqueUserName = `${userName}_${counter}`;
//       counter++;
//     }

//     const hashPassword = await bcrypt.hash(password, 12);

//     const newUser = new User({
//       userName: uniqueUserName,
//       email,
//       password: hashPassword,
//       image: uniqueUserName[0],
//     });

//     await newUser.save();

//     res.status(200).json({
//       success: true,
//       message: "Registration successful",
//       userName: uniqueUserName,
//     });
//   } catch (e) {
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred during registration",
//     });
//   }
// };

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check if email already exists in either User or PendingUser collections
    const existingUser =
      (await User.findOne({ email })) || (await PendingUser.findOne({ email }));
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email! Please try again",
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Generate unique userName
    let uniqueUserName = userName;
    let counter = 1;
    while (
      (await User.findOne({ userName: uniqueUserName })) ||
      (await PendingUser.findOne({ userName: uniqueUserName }))
    ) {
      uniqueUserName = `${userName}_${counter}`;
      counter++;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpires = Date.now() + 3600000; // Token expires in 1 hour

    // Save user in PendingUser collection
    const pendingUser = new PendingUser({
      userName: uniqueUserName,
      email,
      password: hashedPassword,
      verificationToken,
      tokenExpires,
    });

    await pendingUser.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationUrl = `${process.env.REACT_APP_API_URL}/auth/verify-email/${verificationToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Hello ${uniqueUserName},</p>
             <p>Please verify your email by clicking the link below:</p>
             <a href="${verificationUrl}">Verify Email</a>
             <p>This link will expire in 1 hour.</p>`,
    });

    res.status(200).json({
      success: true,
      message:
        "Registration successful. Please check your email to verify your account.",
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
      tokenExpires: { $gt: Date.now() }, // Check if token is still valid
    });

    if (!pendingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification link.",
      });
    }

    const { userName, email, password } = pendingUser;

    // Save user to main User collection
    const newUser = new User({
      userName,
      email,
      password,
      image: userName[0],
    });

    await newUser.save();

    // Delete user from PendingUser collection
    await PendingUser.deleteOne({ _id: pendingUser._id });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.CLIENT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION_TIME }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      message: "Email verified successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred during verification.",
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

    if (checkUser.googleId) {
      return res.status(403).json({
        success: false,
        message:
          "This account is linked with Google. Please log in using Google authentication.",
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
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    const users = await User.find({}).select("-password -__v");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    next(err); // Passes the error to the centralized error handler
  }
};

// const fetchAllUsers = async (req, res) => {
//   try {
//     // Check if the requesting user is an admin
//     if (req.user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. Admin privileges required.",
//       });
//     }

//     // Fetch all users from the database
//     const users = await User.find({}); // Exclude sensitive fields like password and version key

//     res.status(200).json({
//       success: true,
//       users,
//     });
//   } catch (err) {
//     // console.error("Error fetching users:", error);
//     res.status(500).json({
//       success: false,
//       error: err.message,
//       message: "Failed to fetch users. Please try again later.",
//     });
//   }
// };
// const requestPasswordReset = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "No user found with this email.",
//       });
//     }

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const tokenExpiry = Date.now() + 3600000; // 1 hour from now

//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = tokenExpiry;

//     await user.save();

//     const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Password Reset Request",
//       html: `<p>Click the link below to reset your password:</p>
//              <a href="${resetLink}">Reset Password</a>
//              <p>This link will expire in 1 hour.</p>`,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Password reset email sent.",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "An error occurred. Please try again later.",
//     });
//   }
// };
// const resetPassword = async (req, res) => {
//   const { token, newPassword } = req.body;

//   try {
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() }, // Check if token is still valid
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired token.",
//       });
//     }

//     if (newPassword.length < 6) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 6 characters long.",
//       });
//     }

//     user.password = await bcrypt.hash(newPassword, 12);
//     user.resetPasswordToken = undefined; // Clear reset token
//     user.resetPasswordExpires = undefined;

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Password has been reset successfully.",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "An error occurred. Please try again later.",
//     });
//   }
// };

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
    const tokenExpiry = Date.now() + 3600000; // 1 hour from now

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = tokenExpiry;

    await user.save();

    const resetLink = `${process.env.REACT_APP_API_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const logoUrl = "http://localhost:8000/static/logo.png"; // Replace with your actual image URL

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
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
                        background-color: #f9f9f9;
                        margin: 0;
                        padding: 0;
                        color: #333;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 20px auto;
                        background: #ffffff;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .email-header {
                        background: #4CAF50;
                        color: #ffffff;
                        padding: 20px;
                        text-align: center;
                    }
                    .email-header img {
                        max-width: 150px;
                        height: auto;
                    }
                    .email-body {
                        padding: 20px;
                    }
                    .reset-link {
                        display: inline-block;
                        margin: 20px 0;
                        padding: 12px 20px;
                        color: #ffffff;
                        background: #4CAF50;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="email-header">
                        <img src="${logoUrl}" alt="Your Company Logo">
                    </div>
                    <div class="email-body">
                        <p>You requested to reset your password. Click the link below to proceed:</p>
                        <a href="${resetLink}" class="reset-link">Reset Password</a>
                        <p><strong>Note:</strong> This link will expire in 1 hour.</p>
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

  if (!token || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Token and new password are required.",
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long.",
    });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if token is still valid
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetPasswordToken = undefined; // Clear reset token
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password has been reset successfully. You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while resetting the password. Please try again later.",
    });
  }
};

const googleAuth = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;
    let user = await User.findOne({ googleId: sub });

    if (!user) {
      user = await User.findOne({ email });

      if (!user) {
        user = new User({
          email,
          role: "user",
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
        role: user.role,
        email: user.email,
        userName: user.userName,
        image: user.image,
      },
      process.env.CLIENT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION_TIME }
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
  verifyEmail,
  requestPasswordReset,
  resetPassword,
};
