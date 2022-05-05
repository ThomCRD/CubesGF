// Import mongoose
const mongoose = require("mongoose");
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
require('dotenv').config();


// Create Schema Instance and add schema propertise
const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'invalid email'],
        createIndexes: { unique: true },
      },
      password: { type: String, required: true },
      phone: { type: String, required: true },
 
});

userSchema.pre("save", function (next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

userSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(error, isMatch) {
    if (error) {
      console.log(error)
      return callback(error)
    } else {
      callback(null, isMatch)
      console.log(isMatch)
    }
  })
}

const User = mongoose.model('User', userSchema)

module.exports = User
