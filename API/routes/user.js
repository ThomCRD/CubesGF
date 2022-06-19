const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const router = express.Router()
const  { getAllUsers, getUser,updateUser,deleteUser, createUser} = require('../controllers/user')
const  { userAuth, checkRole } = require('../controllers/auth')

// Get a list of users
router.get('/users', userAuth, checkRole(["admin"]), getAllUsers)

// Retrieve a single user
router.get('/user/:id', userAuth, checkRole(["user"]), getUser)

// router.put('/register-user', createUser) 

// Update a user s ID
router.patch('/user/:id',checkTokenMiddleware , updateUser) 

// Delete a user
router.delete('/user/:id',checkTokenMiddleware , deleteUser )

module.exports = router
