const express = require('express');
const {
    getGalleryItems,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
} = require('../controllers/galleryController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(getGalleryItems)
    .post(protect, authorize('admin'), createGalleryItem);

router.route('/:id')
    .put(protect, authorize('admin'), updateGalleryItem)
    .delete(protect, authorize('admin'), deleteGalleryItem);

module.exports = router;
