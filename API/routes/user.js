const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const router = express.Router()

const  { getAllUsers, getUser,createUser,updateUser,deleteUser} = require('../controllers/user')

router.get('/users', getAllUsers)

router.get('/user/:id', getUser)

router.post('/register', createUser) 

router.patch('/user/:id',checkTokenMiddleware , updateUser) 

router.delete('/user/:id',checkTokenMiddleware , deleteUser )

module.exports = router
