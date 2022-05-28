// Import mongoose
const mongoose = require("mongoose");


// Create Schema Instance and add schema propertise
const adressSchema = new mongoose.Schema({
    _id:{ type: String, required: true},
    country :{ type: String, required: true},
    city:{ type: String, required: true},
    street :{ type: String, required: true},
    postal_code:{ type: String, required: true},
});
const Adress = mongoose.model('Adress', adressSchema)

module.exports = Adress