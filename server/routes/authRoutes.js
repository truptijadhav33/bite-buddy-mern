const express = require("express");
const {getMe,
  register,
  login,
  refreshToken,
  logout,forgotPassword,resetPassword
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", protect, getMe);
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout",protect, logout);
router.post("/forgot-password",forgotPassword)
router.put('/reset-password/:token', resetPassword);
module.exports = router;
