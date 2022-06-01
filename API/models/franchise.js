// Import mongoose
const mongoose = require("mongoose");
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
require('dotenv').config();



// Create Schema Instance and add schema propertise
const commentFranchise = new mongoose.Schema({
    restaurant:{type: mongoose.Schema.Types.ObjectId},
    headFranchise:{type: mongoose.Schema.Types.ObjectId},
    subFranchise:{type: mongoose.Schema.Types.ObjectId},
    siren:{ type: String, required: true},
    name:{ type: String, required: true},
    phone:{ type: String, required: true},
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'invalid email'],
        createIndexes: { unique: true },
      },
      password: { 
        type: String, 
        required: true,
        max: 2048,
        min: 6,
       },
});

commentFranchise.pre("save", function (next) {
    const franchise = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return next(err)
        } else {
          bcrypt.hash(franchise.password, salt, function(err, hash) {
            if (err) {
              return next(err)
            }
  
            franchise.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })
const Franchise = mongoose.model('Franchise', commentFranchise)

module.exports = Franchise