const express = require('express')
const router = express.Router()
const imageCtrl = require('../controllers/image')



router.put('/upload'  ,imageCtrl.uploadImage) 

module.exports = router