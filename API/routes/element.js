const express = require('express')
const router = express.Router()
const elementCtrl = require('../controllers/element')
const checkTokenMiddleware = require('../jsonwebtoken/check')


// REST router to get comments
router.get('/comments', elementCtrl.getElements)

// Retrieve a specific element
router.get('/element/:id', elementCtrl.getElement)

// Add a new element to the router
router.put('/element'  ,elementCtrl.createElement) 

// Update an existing element
router.patch('/element/:id',checkTokenMiddleware , elementCtrl.updateElement) 

// Delete an element
router.delete('/element/:id',checkTokenMiddleware , elementCtrl.deleteElement )

module.exports = router
