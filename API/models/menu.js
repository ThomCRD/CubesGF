// Import mongoose
const mongoose = require("mongoose");

// + _id : ObjectId
// + promotions : [ObjectId]
// + name : str
// + price : num
// + photo : ObjectId
// + ingredient : [str]

// Create Schema Instance and add schema propertise
const menuSchema = new mongoose.Schema({
    _id: { type: mongoose.SchemaTypes.ObjectId, required: true},
    _idPromotions: { type: [mongoose.SchemaTypes.ObjectId], required: true},
    name: { type: String, required: true},
    price: { type: Number, required: true},
    _idPhoto :{ type: mongoose.SchemaTypes.ObjectId, required: true},
    _idIngredient :{ type: [mongoose.SchemaTypes.ObjectId], required: true},
});
const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu