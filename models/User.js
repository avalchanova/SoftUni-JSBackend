const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [4, "Username must be at least 4 characters"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [3, "Password must be at least 3 characters"]
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        maxLength: [20, "Adress must be maximum 20 characters"]
    },
    myPublications: [{
        type: mongoose.Types.ObjectId,
        ref: 'Publication',
    }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;