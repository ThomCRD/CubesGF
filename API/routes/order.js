const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const router = express.Router()

const  orderCtrl = require('../controllers/order')

// Returns a list of all orders
router.get('/orders', orderCtrl.getAllOrders)

// Get order find mine
router.get('/order/findMine/:id', orderCtrl.getOrderFindMine)

// Get order by id
router.get('/order/:id', orderCtrl.getOrder)

// Get order find by user
router.get('/order/findByUser/:id', orderCtrl.getOrderFindByUser)

// Get order find by my restaurant
router.get('/order/findByMyRestaurant/:id', orderCtrl.getOrderFindByRestaurant)

// Set a new order on the router
router.put('/order', orderCtrl.createOrder) 

// Delete an order
router.delete('/order/:id',checkTokenMiddleware , orderCtrl.deleteOrder )

module.exports = router