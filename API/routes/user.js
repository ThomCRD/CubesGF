const express = require('express')
const router = express.Router()

const  { getAllUsers, getUser,createUser,updateUser,deleteUser} = require('../controllers/user')

router.get('/users', getAllUsers)

router.get('/user/:userID', getUser)

router.post('/register', createUser) 

router.put('/user/:userID', updateUser) 

router.delete('/user/:userID', deleteUser )

module.exports = router
