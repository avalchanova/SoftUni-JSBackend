const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const jwt = require('../lib/jsonwebtoken.js');
const { SECRET } = require('../constants.js');

exports.findByUsername = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });
exports.register = async (username, email, password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error('Password Missmatch!');
    }

    // TODO: Check if user exists 
    const existingUser = await User.findOne({ // намери един юзър, който да отговаря или на този имейл или на този юзърнейм
        $or: [
            { email },
            { username },
        ]
    });

    if (existingUser) {
        throw new Error('User exists');
    }

    //TODO: Validate password (min,maxLength, etc.)
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPassword });

    return this.login(email, password); //this way we will log the user in automatically

};

exports.login = async (email, password) => {
    //User exists // is it in the DB or is it nonexisting
    const user = await this.findByEmail(email); //will return boolean

    if (!user) {
        throw new Error('Invalid email or password!');
    }

    //Password is valid?
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email or password!');
    }

    //Generate token
    const payload = {
        _id: user._id,
        email,
        username: user.username,
    };
    const token = await jwt.sign(payload, SECRET);
    return token;
};