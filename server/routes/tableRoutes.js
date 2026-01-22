const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableController");
const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Admin / Staff
router.post(
  "/",
  protect,
  authorize("admin", "staff"),
  tableController.createTable
);

router.get(
  "/",
  protect,
  authorize("admin", "staff"),
  tableController.getTables
);

router.get(
  "/:id",
  protect,
  authorize("admin", "staff"),
  tableController.getTable
);

router.put(
  "/:id",
  protect,
  authorize("admin", "staff"),
  tableController.updateTable
);

router.delete(
  "/:id",
  protect,
  authorize("admin", "staff"),
  tableController.deleteTable
);

module.exports = router;
