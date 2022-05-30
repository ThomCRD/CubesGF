const express = require('express')
const router = express.Router()
const elementCtrl = require('../controllers/element')
const checkTokenMiddleware = require('../jsonwebtoken/check')


router.get('/comments', elementCtrl.getElements)

router.get('/element/:id', elementCtrl.getElement)

router.put('/element' ,checkTokenMiddleware ,elementCtrl.createElement) 

router.patch('/element/:id',checkTokenMiddleware , elementCtrl.updateElement) 

router.delete('/element/:id',checkTokenMiddleware , elementCtrl.deleteElement )

module.exports = router
