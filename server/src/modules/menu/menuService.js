const Menu = require("./Menu");
const cloudinary = require('cloudinary').v2;

exports.getMenuItems = async (filters = {}) => {
  return await Menu.find(filters).sort({ category: 1, name: 1 });
};

exports.getMenuCategories = async () => {
  return await Menu.distinct("category");
};

exports.getMenuItemById = async (id) => {
  return await Menu.findById(id);
};

exports.createMenuItem = async (data) => {
  return await Menu.create(data);
};

exports.updateMenuItem = async (id, updateData) => {
  return await Menu.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

exports.deleteMenuItem = async (id) => {
  const item = await Menu.findById(id);
  if (!item) return null;

  // Cleanup Cloudinary
  if (item.imagePublicId) {
    await cloudinary.uploader.destroy(item.imagePublicId);
  }

  await item.deleteOne();
  return item;
};