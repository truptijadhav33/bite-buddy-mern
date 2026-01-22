const GalleryItem = require("../models/GalleryItem");
const cloudinary = require('cloudinary').v2;

exports.createItem = async (data) => {
    return await GalleryItem.create(data);
};

exports.getAllItems = async (filter = {}) => {
    // We sort by newest first for the gallery
    return await GalleryItem.find(filter).sort({ createdAt: -1 });
};

exports.getItemById = async (id) => {
    return await GalleryItem.findById(id);
};

exports.deleteItem = async (id) => {
    const item = await GalleryItem.findById(id);
    if (!item) return null;

    // Remove the image from Cloudinary
    if (item.imagePublicId) {
        await cloudinary.uploader.destroy(item.imagePublicId, { invalidate: true });
    }

    // Remove the record from MongoDB
    await item.deleteOne();
    return item;
};