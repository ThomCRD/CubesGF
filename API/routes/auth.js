const express = require('express')
const router = express.Router()

const authCtrl = require('../controllers/auth')

router.get('/user', authCtrl)

module.exports = router
