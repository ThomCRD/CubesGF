const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const router = express.Router()

const  orderCtrl = require('../controllers/order')

router.get('/orders', orderCtrl.getAllOrders)
router.get('/order/findMine/:id', orderCtrl.getOrderFindMine)
router.get('/order/:id', orderCtrl.getOrder)
router.get('/order/findByUser/:id', orderCtrl.getOrderFindByUser)
router.get('/order/findByMyRestaurant/:id', orderCtrl.getOrderFindByRestaurant)

router.put('/order', orderCtrl.createOrder) 

router.delete('/order/:id',checkTokenMiddleware , orderCtrl.deleteOrder )

module.exports = router