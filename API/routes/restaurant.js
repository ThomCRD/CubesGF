const express = require('express')
const router = express.Router()
const restaurantCtrl = require('../controllers/restaurant')
const checkTokenMiddleware = require('../jsonwebtoken/check')


// Returns a list of all restaurants
router.get('/restaurants', restaurantCtrl.getRestaurants)

// Get a specific restaurant
router.get('/restaurant/:id', restaurantCtrl.getRestaurant)

// Get the findByName for a restaurant
router.get('/restaurant/findByName/:name', restaurantCtrl.getRestaurantfindByName)

// Create a restaurant.
router.put('/restaurant' ,checkTokenMiddleware ,restaurantCtrl.createRestaurant) 

// Update a restaurant
router.patch('/restaurant/:id',checkTokenMiddleware , restaurantCtrl.updateRestaurant) 

// Delete a restaurant
router.delete('/restaurant/:id',checkTokenMiddleware , restaurantCtrl.deleteRestaurant )

module.exports = router
