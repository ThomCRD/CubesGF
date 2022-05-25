// Import mongoose
const mongoose = require("mongoose");


// Create Schema Instance and add schema propertise
const commentSchema = new mongoose.Schema({
<<<<<<< HEAD
    _id:String,
    _iduser :String,
    _idRestaurant:String,
    ContenuTexte :String,
    Note:String
=======
    _id:{ type: String, required: true},
    _iduser :{ type: String, required: true},
    _idRestaurant:{ type: String, required: true},
    ContenuTexte :{ type: String, required: true},
    Note:{ type: String, required: true},
>>>>>>> 3-api-connection-for-User-collection
});
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment