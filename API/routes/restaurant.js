const express = require('express')
const router = express.Router()
const restaurantCtrl = require('../controllers/restaurant')
const checkTokenMiddleware = require('../jsonwebtoken/check')


router.get('/restaurants', restaurantCtrl.getRestaurants)

router.get('/restaurant/:id', restaurantCtrl.getRestaurant)
router.get('/restaurant/findByName/:name', restaurantCtrl.getRestaurantfindByName)

router.put('/restaurant' ,checkTokenMiddleware ,restaurantCtrl.createRestaurant) 

router.patch('/restaurant/:id',checkTokenMiddleware , restaurantCtrl.updateRestaurant) 

router.delete('/restaurant/:id',checkTokenMiddleware , restaurantCtrl.deleteRestaurant )

module.exports = router
