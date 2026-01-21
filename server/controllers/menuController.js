const Category = require('../models/Category');
const MenuItem = require('../models/MenuItem');

// --- Category Controllers ---

// @desc    Get all categories
// @route   GET /api/menu/categories
// @access  Public
exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, count: categories.length, data: categories });
    } catch (err) {
        next(err);
    }
};

// @desc    Create a category
// @route   POST /api/menu/categories
// @access  Private/Admin
exports.createCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({ success: true, data: category });
    } catch (err) {
        next(err);
    }
};

// @desc    Update a category
// @route   PUT /api/menu/categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ success: true, data: category });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete a category
// @route   DELETE /api/menu/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};

// --- MenuItem Controllers ---

// @desc    Get all menu items
// @route   GET /api/menu/items
// @access  Public
exports.getMenuItems = async (req, res, next) => {
    try {
        const menuItems = await MenuItem.find().populate('category', 'name');
        res.status(200).json({ success: true, count: menuItems.length, data: menuItems });
    } catch (err) {
        next(err);
    }
};

// @desc    Create a menu item
// @route   POST /api/menu/items
// @access  Private/Admin
exports.createMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.create(req.body);
        res.status(201).json({ success: true, data: menuItem });
    } catch (err) {
        next(err);
    }
};

// @desc    Update a menu item
// @route   PUT /api/menu/items/:id
// @access  Private/Admin
exports.updateMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json({ success: true, data: menuItem });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/items/:id
// @access  Private/Admin
exports.deleteMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);

        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        await menuItem.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};
