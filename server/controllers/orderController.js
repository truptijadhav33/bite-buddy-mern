const Order = require('../models/Order');
const Table = require('../models/Table');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Staff/Admin
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate('table', 'number')
            .populate('items.menuItem', 'name price');
        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private/Staff/Admin
exports.getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('table', 'number')
            .populate('items.menuItem', 'name price');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};

// @desc    Create an order
// @route   POST /api/orders
// @access  Public (Customer) / Private (Staff)
exports.createOrder = async (req, res, next) => {
    try {
        const { tableId, items, totalAmount } = req.body;

        // Verify table exists
        const table = await Table.findById(tableId);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        const order = await Order.create({
            table: tableId,
            items,
            totalAmount,
        });

        // Update table status and link current order
        table.status = 'Occupied';
        table.currentOrder = order._id;
        table.startTime = new Date();
        await table.save();

        res.status(201).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Staff/Admin
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        // If order is paid or cancelled, free up the table
        if (status === 'Paid' || status === 'Cancelled') {
            const table = await Table.findById(order.table);
            if (table) {
                table.status = status === 'Paid' ? 'Cleaning' : 'Available';
                table.currentOrder = null;
                table.startTime = null;
                await table.save();
            }
        }

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};

// @desc    Update payment status
// @route   PUT /api/orders/:id/payment
// @access  Private/Staff/Admin
exports.updatePaymentStatus = async (req, res, next) => {
    try {
        const { paymentStatus, paymentMethod } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.paymentStatus = paymentStatus;
        if (paymentMethod) order.paymentMethod = paymentMethod;

        if (paymentStatus === 'Paid') {
            order.status = 'Paid';

            // Free up the table
            const table = await Table.findById(order.table);
            if (table) {
                table.status = 'Cleaning';
                table.currentOrder = null;
                table.startTime = null;
                await table.save();
            }
        }

        await order.save();

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};
