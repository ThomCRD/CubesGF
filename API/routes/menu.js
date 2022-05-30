const express = require('express')
const router = express.Router()

const  { 
    getMenus,
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu 
} = require('../controllers/menu')

router.get('/menu', getMenus)

router.get('/menu/:menuID', getMenu)

router.post('/menu', createMenu) 

router.put('/menu/:menuID', updateMenu) 

router.delete('/menu/:menuID', deleteMenu )

module.exports = router
