const express = require('express')
const router = express.Router()
const menuCtrl = require('../controllers/menu')
const checkTokenMiddleware = require('../jsonwebtoken/check')


// List all menus.
router.get('/menus', menuCtrl.getAllMenu)

// Get menu by id
router.get('/menu/:id', menuCtrl.getMenu)

// Add a new menu to the router.
router.put('/menu' ,menuCtrl.createMenu) 

// Update a menu
router.patch('/menu/:id',checkTokenMiddleware , menuCtrl.updateMenu) 

// Delete a menu
router.delete('/menu/:id',checkTokenMiddleware , menuCtrl.deleteMenu )

module.exports = router
