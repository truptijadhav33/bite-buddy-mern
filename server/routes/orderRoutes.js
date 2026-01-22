const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Customer
router.post("/", protect, orderController.createOrder);
router.get("/my", protect, orderController.getMyOrders);

// Admin / Staff
router.get(
  "/",
  protect,
  authorize("admin", "staff"),
  orderController.getAllOrders
);

router.put(
  "/:id/status",
  protect,
  authorize("admin", "staff"),
  orderController.updateOrderStatus
);

module.exports = router;
