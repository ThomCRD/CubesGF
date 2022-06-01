const express = require('express')
const router = express.Router()
const adressCtrl = require('../controllers/adress')
const checkTokenMiddleware = require('../jsonwebtoken/check')

router.get('/adresses', adressCtrl.getadresses)

router.get('/adress/:id', adressCtrl.getAdress)

router.put('/adress',checkTokenMiddleware ,adressCtrl.createAdress) 

router.patch('/adress/:id' ,checkTokenMiddleware , adressCtrl.updateAdress) 

router.delete('/adress/:id',checkTokenMiddleware , adressCtrl.deleteAdress )

module.exports = router
