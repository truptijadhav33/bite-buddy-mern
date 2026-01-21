const mongoose = require('mongoose');

const tableSchema = mongoose.Schema(
    {
        number: {
            type: String,
            required: [true, 'Please add a table number'],
            unique: true,
        },
        capacity: {
            type: Number,
            required: [true, 'Please add table capacity'],
        },
        status: {
            type: String,
            enum: ['Available', 'Occupied', 'Cleaning', 'Reserved'],
            default: 'Available',
        },
        currentOrder: {
            type: mongoose.Schema.ObjectId,
            ref: 'Order',
        },
        startTime: {
            type: Date,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Table', tableSchema);
