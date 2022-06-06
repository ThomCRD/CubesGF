// Import mongoose
const mongoose = require("mongoose");

// Create Schema Instance and add schema propertise
const menuSchema = new mongoose.Schema({
    promotions :{type: mongoose.Schema.Types.ObjectId},
    photo:{type: mongoose.Schema.Types.ObjectId},
    name :{ type: String, required: true},
    ingredient :[{ type: String, required: true}],
    price:{ type: Number, required: true},
});

const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu