const mongoose = require('mongoose');
const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [6, "Title must be at least 6 characters long"]
    },
    paintingTechnique: {
        type: String,
        maxLength: [15, 'The painting technique must be maximum 15 characters long'],
        required: true
    },
    artPicture: {
        type: String,
        validate: /^https?:\/\//,
        required: true,
    },
    certificate: {
        type: String,
        enum: ["Yes", "No"],
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    usersShared: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
});


const Publication = mongoose.model('Publication', publicationSchema);
module.exports = Publication;