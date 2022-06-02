const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const router = express.Router()

const  { getAllUsers, getUser,createUser,updateUser,deleteUser} = require('../controllers/user')

const  { userAuth, checkRole } = require('../controllers/auth')

router.get('/users', userAuth, checkRole(["user"]), getAllUsers)

router.get('/user/:id', userAuth, checkRole(["user"]), getUser)

router.put('/register', createUser) 

router.patch('/user/:id',checkTokenMiddleware , updateUser) 

router.delete('/user/:id',checkTokenMiddleware , deleteUser )

module.exports = router
