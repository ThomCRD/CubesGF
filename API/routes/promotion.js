const express = require('express')
const router = express.Router()
const promotionCtrl = require('../controllers/promotion')
const checkTokenMiddleware = require('../jsonwebtoken/check')


// List all promotions.
router.get('/promotions', promotionCtrl.getAllPromotions)

// Get a specific promotion
router.get('/promotion/:id', promotionCtrl.getPromotion)

// Create a new promotion
router.put('/promotion', promotionCtrl.createPromotion)

// Update a promotion
router.patch('/promotion/:id', checkTokenMiddleware, promotionCtrl.updatePromotion)

// Delete a promotion
router.delete('/promotion/:id', checkTokenMiddleware, promotionCtrl.deletePromotion)

module.exports = router
