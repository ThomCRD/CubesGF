const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const router = express.Router()

const  { getAllUsers, getUser,createUser,updateUser,deleteUser} = require('../controllers/user')

router.get('/users', getAllUsers)

router.get('/user/:userID', getUser)

router.put('/register', createUser) 

router.patch('/user/:userID',checkTokenMiddleware , updateUser) 

router.delete('/user/:userID',checkTokenMiddleware , deleteUser )

module.exports = router
