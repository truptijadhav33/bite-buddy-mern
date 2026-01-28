const menuService = require("./menuService");
const wrapAsync = require("../../shared/utils/wrapAsync");
const cloudinary = require('cloudinary').v2;

exports.getMenuItems = wrapAsync(async (req, res) => {
  const filters = req.query.category ? { category: req.query.category } : {};
  const items = await menuService.getMenuItems(filters);
  res.status(200).json(items);
});

exports.getMenuCategories = wrapAsync(async (req, res) => {
  const categories = await menuService.getMenuCategories();
  res.status(200).json(categories);
});

exports.getMenuItem = wrapAsync(async (req, res) => {
  const item = await menuService.getMenuItemById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.status(200).json(item);
});

exports.createMenuItem = wrapAsync(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Image required" });

  const newItem = await menuService.createMenuItem({
    ...req.body,
    imageUrl: req.file.path,
    imagePublicId: req.file.filename
  });

  res.status(201).json(newItem);
});

exports.updateMenuItem = wrapAsync(async (req, res) => {
  let item = await menuService.getMenuItemById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });

  if (req.file) {
    // Delete old image before updating to new one
    if (item.imagePublicId) await cloudinary.uploader.destroy(item.imagePublicId);
    req.body.imageUrl = req.file.path;
    req.body.imagePublicId = req.file.filename;
  }

  const updated = await menuService.updateMenuItem(req.params.id, req.body);
  res.status(200).json(updated);
});

exports.deleteMenuItem = wrapAsync(async (req, res) => {
  const deleted = await menuService.deleteMenuItem(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.status(200).json({ message: "Deleted successfully" });
});