const express = require('express')
const router = express.Router()
const promotionCtrl = require('../controllers/promotion')
const checkTokenMiddleware = require('../jsonwebtoken/check')


router.get('/promotions', promotionCtrl.getAllPromotions)

router.get('/promotion/:id', promotionCtrl.getPromotion)

router.put('/promotion', promotionCtrl.createPromotion)

router.patch('/promotion/:id', checkTokenMiddleware, promotionCtrl.updatePromotion)

router.delete('/promotion/:id', checkTokenMiddleware, promotionCtrl.deletePromotion)

module.exports = router
