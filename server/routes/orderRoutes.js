const express = require('express');
const {
    getOrders,
    getOrder,
    createOrder,
    updateOrderStatus,
    updatePaymentStatus,
} = require('../controllers/orderController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, authorize('staff', 'admin'), getOrders)
    .post(createOrder); // Customers can create orders without login (via QR)

router.route('/:id')
    .get(protect, authorize('staff', 'admin'), getOrder);

router.put('/:id/status', protect, authorize('staff', 'admin'), updateOrderStatus);
router.put('/:id/payment', protect, authorize('staff', 'admin'), updatePaymentStatus);

module.exports = router;
