const mongoose = require('mongoose');
function getFirstMongooseError(error) {
    const errors = Object.keys(error.errors).map(key => error.errors[key].message); // array of messages
    return errors[0];
}
exports.getErrorMessage = (error) => {
    switch (error.name) {
        case "Error":
            return error.message;
        case "Validation Error":
            return getFirstMongooseError(error);
        default: return error.message;
    }
};

//при await на нещо, трябва да имаме try-catch и да хандълнем грешката