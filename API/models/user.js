// Import mongoose
const mongoose = require("mongoose");
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Create Schema Instance and add schema propertise
const userSchema = new mongoose.Schema({
    firstName: { 
      type: String, 
      required: true 
    },
    lastName: { 
      type: String, 
      required: false 
    },
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
    address : { 
      type: mongoose.SchemaTypes.ObjectId, 
    },
    restaurant : { 
      type: [mongoose.SchemaTypes.ObjectId], 
    },
    siren : { 
      type: String, 
    },
    head_franchise : { 
      type: mongoose.SchemaTypes.ObjectId, 
    },
    sub_franchise : { 
      type: [mongoose.SchemaTypes.ObjectId], 
    },
    phone: { 
      type: String, 
    },
    role : { 
      type : String,
      default: "user",
      enum: ["user", "supplier", "admin","franchisee","customer"]
    }
});

// Hash the user s password and salt.
userSchema.pre("save", function (next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
    console.log(user.password)
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err)
      } else {
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) {
            return next(err)
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


module.exports = mongoose.model('User', userSchema)
