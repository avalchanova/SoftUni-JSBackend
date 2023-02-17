const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    //TODO: add additional validations
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [5, "Username must be at least 5 characters"]
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: [10, 'Email must be at least 10 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;