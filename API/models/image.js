const mongoose = require("mongoose");

// Create Schema Instance and add schema propertise
const imageSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    }
});
const Image = mongoose.model('Image', imageSchema)

module.exports = Image