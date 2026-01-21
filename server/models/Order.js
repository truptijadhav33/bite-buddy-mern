const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        table: {
            type: mongoose.Schema.ObjectId,
            ref: 'Table',
            required: true,
        },
        items: [
            {
                menuItem: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'MenuItem',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, 'Quantity cannot be less than 1'],
                },
                price: {
                    type: Number,
                    required: true,
                },
                instructions: {
                    type: String,
                },
            },
        ],
        status: {
            type: String,
            enum: ['Pending', 'Preparing', 'Ready', 'Served', 'Cancelled', 'Paid'],
            default: 'Pending',
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ['Unpaid', 'Paid'],
            default: 'Unpaid',
        },
        paymentMethod: {
            type: String,
            enum: ['Cash', 'Card', 'UPI', 'None'],
            default: 'None',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Order', orderSchema);
