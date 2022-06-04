const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const router = express.Router()

const  orderCtrl = require('../controllers/order')

router.get('/orders', orderCtrl.getAllOrders)

router.get('/order/:id', orderCtrl.getOrder)

router.put('/order', orderCtrl.createOrder) 

router.delete('/order/:id',checkTokenMiddleware , orderCtrl.deleteOrder )

module.exports = router