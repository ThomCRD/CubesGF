// Import mongoose
const mongoose = require("mongoose");


// Create Schema Instance and add schema propertise
const commentSchema = new mongoose.Schema({
    _id:String,
    _iduser :String,
    _idRestaurant:String,
    ContenuTexte :String,
    Note:String
});
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment