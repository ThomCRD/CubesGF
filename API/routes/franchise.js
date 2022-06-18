const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const router = express.Router()

const  franchiseCtrl = require('../controllers/franchise')

router.get('/franchises',checkTokenMiddleware, franchiseCtrl.getAllFranchises)

router.get('/franchise/:id', franchiseCtrl.getFranchise)

router.put('/register', franchiseCtrl.createFranchise) 

router.patch('/franchise/:id',checkTokenMiddleware , franchiseCtrl.updateFranchise) 

router.delete('/franchise/:id',checkTokenMiddleware , franchiseCtrl.deleteFranchise )

module.exports = router
