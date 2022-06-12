/**** Import of necessary modules */

const express = require('express')
const {sendLogin}  = require('../controllers/auth')


/**** Router Recovery */
const router = express.Router()

/**** Middleware for date and time */
router.use((req, res, next) => {
    const event = new Date()
    console.log(`Auth login time : ${event.toString()}`)
    next()
})

/****Auth resource routing */
router.post('/login', sendLogin )

module.exports = router
