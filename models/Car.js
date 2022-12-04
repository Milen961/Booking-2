const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const carSchema = new Schema({
    name: { type: String, required: true, unique: true, minlength: [4, 'Hotel name must be at least 4 characters long'] },
    brand: { type: String, required: true, minlength: [2, 'City name must be at least 3 characters long'] },
    imageUrl: {
        type: String, required: true, validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Image URL is not valid'
        }
    },
    year: { type: Number, required: true },
    licens: { type: String, required: true, unique: true },
    description: {type : String, required: true, minlength: [10, 'Description must be at least 10 characters long'] }, 
    bookings: { type: [Types.ObjectId], ref: 'User', default: [] },
    owner: { type: Types.ObjectId, ref: 'User', required: true }
});

carSchema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});
const Car = model('Car', carSchema);

module.exports = Car
