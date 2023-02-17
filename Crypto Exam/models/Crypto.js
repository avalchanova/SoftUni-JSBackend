const mongoose = require('mongoose');
const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
    },
    image: {
        type: String,
        validate: /^https?:\/\//,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        minLength: 10,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: {
            values: ["crypto-wallet", "credit-card", "debit-card", "paypal"],
            message: "Invalid payment method",
        },
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buyers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
});


const Crypto = mongoose.model('Crypto', cryptoSchema);
module.exports = Crypto;