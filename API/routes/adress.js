const express = require('express')
const router = express.Router()
const adressCtrl = require('../controllers/adress')
const checkTokenMiddleware = require('../jsonwebtoken/check')

router.get('/adresses', adressCtrl.getadresses)

router.get('/adress/:adressID', adressCtrl.getAdress)

router.put('/adress' ,checkTokenMiddleware ,adressCtrl.createAdress) 

router.patch('/adress/:adressID',checkTokenMiddleware , adressCtrl.updateAdress) 

router.delete('/adress/:adressID',checkTokenMiddleware , adressCtrl.deleteAdress )

module.exports = router
