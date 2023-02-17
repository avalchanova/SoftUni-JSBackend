const { paymentMethodsMap } = require('../constants.js');
const Crypto = require('../models/Crypto.js');
exports.getAll = () => Crypto.find({}).lean(); //find all the crypto from the DB 
exports.getOne = (cryptoId) => Crypto.findById(cryptoId).lean();
exports.buy = async (userId, cryptoId) => {
    const crypto = await Crypto.findById(cryptoId);
    // Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId } }); // this is equal to line 8 and 9 
    //TODO: check if user has already bought the crypto 
    crypto.buyers.push(userId);
    return crypto.save(); //await instead of return can be used because it goes to the DB
};
exports.create = (ownerId, cryptoData) => Crypto.create({ ...cryptoData, owner: ownerId });
//...cryptoData because we distrcuture the data not by hand but by ...
//the ownerId will be taken automatically via the logged in user

exports.edit = (cryptoId, cryptoData) =>
    // return Crypto.findByIdAndUpdate(cryptoId, cryptoData) // това беше написало бебето
    Crypto
        .findByIdAndUpdate(cryptoId,
            {
                name: cryptoData.name,
                image: cryptoData.image,
                price: cryptoData.price,
                description: cryptoData.description,
                paymentMethod: cryptoData.paymentMethod
            });


exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.search = async (name, paymentMethod) => {
    let crypto = await this.getAll();

    if (name) {
        crypto = crypto.filter(x => x.name.toLowerCase() == name.toLowerCase());
    }

    if (paymentMethod) {
        crypto = crypto.filter(x => x.paymentMethod == paymentMethod);
    }

    return crypto;
};