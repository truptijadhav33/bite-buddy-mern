import wrapAsync from "../utils/wrapAsync.js";
import * as authService from "../services/authService.js";
import crypto from "crypto";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

// 1. Forgot Password - Send Email
export const forgotPassword = wrapAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ message: "There is no user with that email." });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const message = `You requested a password reset. Please use this link: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Token",
      message,
    });
    res.status(200).json({ message: "Token sent to email!" });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({ message: "Email could not be sent" });
  }
});

// 2. Reset Password - Final Step
export const resetPassword = wrapAsync(async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successful!" });
});

// 3. Get Me
export const getMe = wrapAsync(async (req, res) => {
  const user = await authService.getUserProfile(req.user._id);
  res.status(200).json({ success: true, user });
});

// 4. Register
export const register = wrapAsync(async (req, res) => {
  const user = await authService.registerUser(req.body);
  res.status(201).json({
    message: "User registered successfully",
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// 5. Login
export const login = wrapAsync(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.loginUser(req.body);
  res.json({
    accessToken,
    refreshToken,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// 6. Refresh Token
export const refreshToken = wrapAsync(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh Token is required" });
  }
  const tokens = await authService.refreshUserToken(refreshToken);
  res.status(200).json(tokens);
});

// 7. Logout
export const logout = wrapAsync(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not identified" });
  }
  await authService.logoutUser(req.user._id);
  res.status(200).json({ message: "Logged out successfully" });
});