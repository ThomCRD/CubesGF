// Import mongoose
const mongoose = require("mongoose");


// Create Schema Instance and add schema propertise
const commentSchema = new mongoose.Schema({
    _id:{ type: String, required: true},
    _iduser :{ type: String, required: true},
    _idRestaurant:{ type: String, required: true},
    ContenuTexte :{ type: String, required: true},
    Note:{ type: String, required: true},
});
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment