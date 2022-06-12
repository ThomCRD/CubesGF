// Import mongoose
const mongoose = require("mongoose");



// Create Schema Instance and add schema propertise
const elementSchema = new mongoose.Schema({
    name: { type: String },
    volume: { type: Number },

});
const Element = mongoose.model('Element', elementSchema)

module.exports = Element