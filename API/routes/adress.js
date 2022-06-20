const express = require('express')
const router = express.Router()
const adressCtrl = require('../controllers/adress')
const checkTokenMiddleware = require('../jsonwebtoken/check')

// Returns a list of addresses
router.get('/adresses', adressCtrl.getadresses)

// Returns the address of the current user.
router.get('/adress/:id', adressCtrl.getAdress)

// Add an address to the router.
router.put('/adress',checkTokenMiddleware ,adressCtrl.createAdress) 

// Update an address.
router.patch('/adress/:id' ,checkTokenMiddleware , adressCtrl.updateAdress) 

// Delete an address
router.delete('/adress/:id',checkTokenMiddleware , adressCtrl.deleteAdress )

module.exports = router
