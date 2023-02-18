const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const jwt = require('../lib/jsonwebtoken.js');
const { SECRET } = require('../constants.js');

exports.findByUsername = (username) => User.findOne({ username });
exports.findById = (id) => User.findById({ id });
exports.register = async (username, password, repeatPassword, address) => {
    console.log(username, password, repeatPassword, address);
    if (password !== repeatPassword) {
        console.log('Passwords are not okay');
        throw new Error('Password Missmatch!');
    }

    // TODO: Check if user exists 
    const existingUser = await User.findOne({
        $or: [
            { username }
        ]
    });

    if (existingUser) {
        throw new Error('User exists');
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, password: hashedPassword, address });

    return this.login(username, password); //automatical login after registration
};

exports.login = async (username, password) => {
    //Does the User exists //checking in DB
    const user = await this.findByUsername(username); //will return boolean

    if (!user) {
        throw new Error('Invalid username or password!');
    }

    //Is password valid
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid username or password!');
    }

    //Generate token
    const payload = {
        _id: user._id,
        username: user.username,
    };
    const token = await jwt.sign(payload, SECRET);
    return token;
};