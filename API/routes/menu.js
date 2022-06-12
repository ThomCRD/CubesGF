const express = require('express')
const router = express.Router()
const menuCtrl = require('../controllers/menu')
const checkTokenMiddleware = require('../jsonwebtoken/check')


router.get('/menus', menuCtrl.getAllMenu)

router.get('/menu/:id', menuCtrl.getMenu)

router.put('/menu' ,menuCtrl.createMenu) 

router.patch('/menu/:id',checkTokenMiddleware , menuCtrl.updateMenu) 

router.delete('/menu/:id',checkTokenMiddleware , menuCtrl.deleteMenu )

module.exports = router
