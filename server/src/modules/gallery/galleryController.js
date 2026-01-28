const galleryService = require("./galleryService");
const wrapAsync = require("../../shared/utils/wrapAsync");

// GET: Fetch all active gallery items
exports.getAll = wrapAsync(async (req, res) => {
  const items = await galleryService.getAllItems({ isActive: true });
  res.status(200).json({ success: true, count: items.length, data: items });
});

// GET: Fetch by category (food, interior, etc.)
exports.getByCategory = wrapAsync(async (req, res) => {
  const { category } = req.params;
  const items = await galleryService.getAllItems({ category, isActive: true });
  res.status(200).json({ success: true, data: items });
});

// POST: Add new gallery item (Admin Only)
exports.createItem = wrapAsync(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload an image" });
  }

  const galleryData = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    imageUrl: req.file.path,        // URL from Cloudinary
    imagePublicId: req.file.filename, // Public ID from Cloudinary
    uploadedBy: req.user._id        // From 'protect' middleware
  };

  const newItem = await galleryService.createItem(galleryData);
  res.status(201).json({ success: true, data: newItem });
});

// DELETE: Remove gallery item (Admin Only)
exports.deleteItem = wrapAsync(async (req, res) => {
  const deleted = await galleryService.deleteItem(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "Gallery item not found" });
  }

  res.status(200).json({ success: true, message: "Gallery item and image deleted" });
});

//UPDATE: Change gallery item (Admin Only)
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    // The text fields arrive in req.body
    const updateData = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
    };

    // req.file will contain the new Cloudinary details if a file was uploaded
    const updatedItem = await galleryService.updateItem(id, updateData, req.file);

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedItem,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to update item",
    });
  }
};