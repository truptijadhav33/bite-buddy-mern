import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Added .js extension
import wrapAsync from "../utils/wrapAsync.js"; // Optional: use your wrapper for cleaner errors

// Protect routes
export const protect = wrapAsync(async (req, res, next) => {
  let token;

  // 1. Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }

  try {
    // 2. Verify token (Check if JWT_SECRET matches your token generation)
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET);

    // 3. Find user and attach to request object
    req.user = await User.findById(decoded.id).select("-password");
    
    if (!req.user) {
      res.status(401);
      throw new Error("User no longer exists");
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token invalid");
  }
});

// Role-based access
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      return next(new Error("You do not have permission to perform this action"));
    }
    next();
  };
};