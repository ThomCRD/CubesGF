const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const router = express.Router()

const  franchiseCtrl = require('../controllers/franchise')

// Get a list of users franchises
router.get('/users', franchiseCtrl.getAllFranchises)

// Get franchise.
router.get('/franchise/:id', franchiseCtrl.getFranchise)

// Register a franchise.
router.put('/register', franchiseCtrl.createFranchise) 

// Update franchise.
router.patch('/franchise/:id',checkTokenMiddleware , franchiseCtrl.updateFranchise) 

// Delete franchise.
router.delete('/franchise/:id',checkTokenMiddleware , franchiseCtrl.deleteFranchise )

module.exports = router
