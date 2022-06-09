// Import mongoose
const mongoose = require("mongoose");



// Create Schema Instance and add schema propertise
const orderSchema = new mongoose.Schema({
    customer:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    restaurant:{type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true},
    promotion:{type: mongoose.Schema.Types.ObjectId, ref: 'Promotion', required: true},
    menus:{type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true},
    delivery_time:{ type: Date, required: true},
    total:{ type: Number, required: true},
    created_at: {type: Date, default: Date.now},
});

orderSchema.pre('save', function(next){
    now = new Date();
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});
const Order = mongoose.model('Order', orderSchema)

module.exports = Order