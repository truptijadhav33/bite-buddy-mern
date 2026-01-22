const wrapAsync = require("../utils/wrapAsync");
const orderService = require("../services/orderService");

exports.createOrder = wrapAsync(async (req, res) => {
  const { items, tableId } = req.body;

  const order = await orderService.createOrder(
    req.user._id,
    items,
    tableId
  );

  res.status(201).json(order);
});

exports.getMyOrders = wrapAsync(async (req, res) => {
  // Use the service function you created, not .find()
  const orders = await orderService.getMyOrders(req.user._id); 
  
  // Make sure the frontend expects this structure
  res.json(orders); 
});


exports.getAllOrders = wrapAsync(async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.json(orders);
});

exports.updateOrderStatus = wrapAsync(async (req, res) => {
  const order = await orderService.updateOrderStatus(
    req.params.id,
    req.body.status
  );
  res.json(order);
});
