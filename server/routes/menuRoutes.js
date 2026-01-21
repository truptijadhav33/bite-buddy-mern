const express = require('express');
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
} = require('../controllers/menuController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

// Category Routes
router.route('/categories')
    .get(getCategories)
    .post(protect, authorize('admin'), createCategory);

router.route('/categories/:id')
    .put(protect, authorize('admin'), updateCategory)
    .delete(protect, authorize('admin'), deleteCategory);

// MenuItem Routes
router.route('/items')
    .get(getMenuItems)
    .post(protect, authorize('admin'), createMenuItem);

router.route('/items/:id')
    .put(protect, authorize('admin'), updateMenuItem)
    .delete(protect, authorize('admin'), deleteMenuItem);

module.exports = router;
