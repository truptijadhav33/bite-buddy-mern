const mongoose = require('mongoose');

const galleryItemSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'],
            trim: true,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            required: [true, 'Please add an image URL'],
        },
        category: {
            type: String,
            enum: ['Interior', 'Food', 'Events', 'Other'],
            default: 'Other',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
