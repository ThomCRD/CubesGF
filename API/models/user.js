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
      required: false
    },
    phone: { 
      type: String, 
      required: false 
    },
    role : { 
      type : String,
      default: 'customer',
      enum: ["customer", "supplier", "admin"]
    }
});

// userSchema.pre("save", function (next) {
//   const user = this

//   if (this.isModified("password") || this.isNew) {
//     bcrypt.genSalt(10, function (err, salt) {
//       if (err) {
//         return next(err)
//       } else {
//         bcrypt.hash(user.password, salt, function(err, hash) {
//           if (err) {
//             return next(err)
//           }

//           user.password = hash
//           next()
//         })
//       }
//     })
//   } else {
//     return next()
//   }
// })

const User = mongoose.model('User', userSchema)

module.exports = User
