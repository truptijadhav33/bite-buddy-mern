const express = require("express");
const router = express.Router();

const galleryController = require("./galleryController");
const { protect, authorize } = require("../../shared/middleware/authMiddleware");
const upload = require("../../shared/middleware/uploadMiddleware");

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

router.put("/:id", protect, authorize("admin"), upload.single("image"), galleryController.updateItem)

module.exports = router;
