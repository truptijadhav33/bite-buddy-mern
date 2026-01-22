const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Public

// 1. Static/Specific routes first
router.get("/", menuController.getMenuItems);
router.get("/categories", menuController.getMenuCategories);

// 2. Dynamic parameter routes last
router.get("/:id", menuController.getMenuItem);
// Admin routes
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  menuController.createMenuItem
);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  menuController.updateMenuItem
);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  menuController.deleteMenuItem
);

module.exports = router;
