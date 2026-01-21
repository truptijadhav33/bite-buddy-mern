const GalleryItem = require('../models/GalleryItem');

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
exports.getGalleryItems = async (req, res, next) => {
    try {
        const items = await GalleryItem.find();
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (err) {
        next(err);
    }
};

// @desc    Create a gallery item
// @route   POST /api/gallery
// @access  Private/Admin
exports.createGalleryItem = async (req, res, next) => {
    try {
        const item = await GalleryItem.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (err) {
        next(err);
    }
};

// @desc    Update a gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Admin
exports.updateGalleryItem = async (req, res, next) => {
    try {
        const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!item) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        res.status(200).json({ success: true, data: item });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
exports.deleteGalleryItem = async (req, res, next) => {
    try {
        const item = await GalleryItem.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        await item.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};
