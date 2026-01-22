const Order = require("../models/Order");
const Menu = require("../models/Menu");
const Table = require("../models/Table");
const { ORDER_STATUS_FLOW } = require("../utils/orderStatus");

exports.createOrder = async (userId, items, tableId = null) => {
  if (!items || items.length === 0) {
    const err = new Error("Order items cannot be empty");
    err.statusCode = 400;
    throw err;
  }

  let totalAmount = 0;
  const orderItems = [];

  for (const item of items) {
    const menuItem = await Menu.findById(item.menuItem);
    if (!menuItem || !menuItem.isAvailable) {
      const err = new Error("Menu item unavailable");
      err.statusCode = 400;
      throw err;
    }

    totalAmount += menuItem.price * item.quantity;

    orderItems.push({
      menuItem: menuItem._id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: item.quantity,
    });
  }

  const orderData = {
    user: userId,
    items: orderItems,
    totalAmount,
  };

  // Link table if provided
  let table = null;
  if (tableId) {
    table = await Table.findById(tableId);
    if (!table || table.status !== "available") {
      const err = new Error("Table is not available");
      err.statusCode = 400;
      throw err;
    }

    table.status = "occupied";
    await table.save();
    orderData.table = table._id;
  }

  const order = await Order.create(orderData);

  // Save current order on table
  if (table) {
    table.currentOrder = order._id;
    await table.save();
  }

  return order;
};

exports.updateOrderStatus = async (orderId, newStatus) => {
  const order = await Order.findById(orderId);

  if (!order) {
    const err = new Error("Order not found");
    err.statusCode = 404;
    throw err;
  }

  const allowedNextStatuses =
    ORDER_STATUS_FLOW[order.status] || [];

  if (!allowedNextStatuses.includes(newStatus)) {
    const err = new Error(
      `Cannot change order status from ${order.status} to ${newStatus}`
    );
    err.statusCode = 400;
    throw err;
  }

  order.status = newStatus;
  await order.save();

  // 🔁 Release table if order ends
  if (
    (newStatus === "completed" || newStatus === "cancelled") &&
    order.table
  ) {
    const table = await Table.findById(order.table);
    if (table) {
      table.status = "available";
      table.currentOrder = null;
      await table.save();
    }
  }

  return order;
};
exports.getAllOrders = async () => {
  // Get all orders, including user info and table info
  return Order.find()
    .populate("user", "name email role")        // include basic user info
    .populate("table", "tableNumber capacity status") // include table info
    .populate("items.menuItem", "name price")   // populate menu item details in items
    .sort({ createdAt: -1 });                   // newest first
};

exports.getMyOrders = async (userId) => {
  return Order.find({ user: userId })
    .populate("items.menuItem", "name price image")
    .populate("table", "tableNumber capacity")
    .sort({ createdAt: -1 });
};