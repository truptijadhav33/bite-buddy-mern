const express = require("express");
const router = express.Router();

const galleryController = require("../controllers/galleryController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Public
router.get("/", galleryController.getAll);
router.get(
  "/category/:category",
  galleryController.getByCategory
);

// Admin only
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  galleryController.createItem
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  galleryController.deleteItem
);

module.exports = router;
