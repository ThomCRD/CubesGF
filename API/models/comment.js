// Import mongoose
const mongoose = require("mongoose");



// Create Schema Instance and add schema propertise
const commentSchema = new mongoose.Schema({
    _iduser :{type: mongoose.Schema.Types.ObjectId},
    _idRestaurant:{type: mongoose.Schema.Types.ObjectId},
    contenuTexte :{ type: String, required: true},
    note:{ type: String, required: true},
    // created_at: {type: Date, default: Date.now},
    // updated_at: {type: Date, default: Date.now}
});
// commentSchema.pre('save', function(next){
//     now = new Date();
//     this.updated_at = now;
//     if(!this.created_at) {
//         this.created_at = now
//     }
//     next();
// });
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment