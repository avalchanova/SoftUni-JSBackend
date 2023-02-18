const Publication = require('../models/Publication.js');
const User = require('../models/User.js');
exports.getAll = () => Publication.find({}).lean();
exports.getOne = (publicationId) => Publication.findById(publicationId).lean();

exports.create = async (authorId, publicationData) => {
    Publication.create({ ...publicationData, author: authorId });
};

exports.edit = (publicationId, publicationData) => Publication.findByIdAndUpdate(publicationId, publicationData, { runValidators: true });

exports.delete = (publicationId) => Publication.findByIdAndDelete(publicationId);

exports.share = async (userId, publicationId) => {
    const publication = await Publication.findById(publicationId);
    publication.usersShared.push(userId);
    return publication.save(); //await instead of return can be used because it goes to the DB
};