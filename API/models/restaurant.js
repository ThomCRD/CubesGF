// Import mongoose
const mongoose = require("mongoose");



// Create Schema Instance and add schema propertise
const restaurantSchema = new mongoose.Schema({
    franchise: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' },
    name: { type: String, required: true },
    adress: { type: mongoose.Schema.Types.ObjectId, ref: 'Adress' },
    photo: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});
const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant