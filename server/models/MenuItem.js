const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a menu item name'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: true,
        },
        image: {
            type: String,
            default: 'no-image.jpg',
        },
        spicy: {
            type: Boolean,
            default: false,
        },
        veg: {
            type: Boolean,
            default: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);
