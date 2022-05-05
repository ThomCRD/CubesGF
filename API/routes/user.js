const express = require('express')
const router = express.Router()

const  { getAllUsers, getUser,createUser,updateUser,deleteUser} = require('../controllers/user')

router.get('/user', getAllUsers)

router.get('/user/:userID', getUser)

router.post('/user', createUser) 

router.put('/user/:userID', updateUser) 

router.delete('/user/:userID', deleteUser )

module.exports = router
