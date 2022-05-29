// Import mongoose
const mongoose = require("mongoose");


// Create Schema Instance and add schema propertise
const commentSchema = new mongoose.Schema({
    _iduser :{ type: String, required: true},
    _idRestaurant:{ type: String, required: true},
    contenuTexte :{ type: String, required: true},
    note:{ type: String, required: true},
});
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment