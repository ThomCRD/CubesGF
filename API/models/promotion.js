// Import mongoose
const mongoose = require("mongoose");

// Create Schema Instance and add schema propertise
const promotionSchema = new mongoose.Schema({
    menus:{type: mongoose.Schema.Types.ObjectId, required: true},
    start_date:{ type: Date, required: true},
    end_date:{ type: Date, required: true},
    price:{ type: Number, required: true},

});

const Promotion = mongoose.model('Promotion', promotionSchema)

module.exports = Promotion