// const bcrypt = require('bcrypt')
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')

// const sendLogin = async (req, res) => {
//     try {
//         let user = await User.findOne({ email: req.body.email })
//         if (user === null) {
//             //return res.status(404).json({ message: "Wrong mail or password" })
//             return res.status(401).json({ message: "Wrong mail or password" })
//         }
//         const test = await bcrypt.compare(req.body.password, user.password)
//         if (test) {
//             const token = jwt.sign({
//                 email: user.email,
//                 firstName: user.firstName
//             }, process.env.JWT_SECRET, { expiresIn: '3 hours' })
//             //return res.json({ access_token: token, message:'connected' })
//             return res.status(200).json({ access_token: token, message:'connected' })

//         } else {
//             return res.status(401).json({ message: `Wrong mail or password` })
//         }
//     } catch (err) {
//         res.status(500).json({ message: `login process error`, error: err })
//     }
// }
// module.exports = { sendLogin }

//===================
//===================
//===================
//===================
//===================
//===================

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user");

/**
 * @DESC To register the user (ADMIN, SUPER_ADMIN, USER)
 */
const userRegister = async (userDets,role, res) => {
  try {
    // validate the email
    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false
      });
    }

    // create a new user
    // const role ="user"
    const newUser = new User({
      ...userDets,
      role
    });

    userDets.body = newUser
    let user = await User.create(userDets.body);
    return res.status(201).json({
      message: 'Hurry! now you are successfully registred. Please nor login.',
      data: user,
      success: true
    });
  } catch (err) {
    // Implement logger function (winston)
    return res.status(500).json({
      message: "Unable to create your account.",
      success: false
    });
  }
};

/**
 * @DESC To Login the user (ADMIN, SUPER_ADMIN, USER)
 */
const userLogin = async (userCreds, role, res) => {
  let { email, password } = userCreds;
  // First Check if the username is in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Email is not found. Invalid login credentials.",
      success: false
    });
  }
  // We will check the role
  if (user.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
      success: false
    });
  }
  // That means user is existing and trying to signin fro the right portal
  // Now check for the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168
    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }
};

// const validateUsername = async username => {
//   let user = await User.findOne({ username });
//   return user ? false : true;
// };

/**
 * @DESC Passport middleware
 */
const userAuth = passport.authenticate("jwt", { session: false });

/**
 * @DESC Check Role Middleware
 */
const checkRole = roles => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();

    // Checks if a user is logged in.
const validateEmail = async email => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

// Converts a user object to a JSON - ready representation.
const serializeUser = user => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: user.address,
    phone: user.phone,
    role: user.role,
    _id: user._id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
  };
};

module.exports = {
  checkRole,
  userLogin,
  userRegister,
  serializeUser,
  userAuth
};