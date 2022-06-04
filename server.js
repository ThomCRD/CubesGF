const express = require('express');
require('dotenv').config();
const routesComment = require('./API/routes/comment');
const routesUser = require('./API/routes/user');
const routesAuth = require('./API/routes/auth');
const routesAdress = require('./API/routes/adress');
const routesRestaurant = require('./API/routes/restaurant');
const routesElement = require('./API/routes/element');
const routesImage = require('./API/routes/image');
const routesOrder = require('./API/routes/order');
const bodyParser = require("body-parser");




require('./Config/db')


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routesComment)
app.use('/api', routesUser)
app.use('/api', routesAuth)
app.use('/api', routesAdress)
app.use('/api', routesRestaurant)
app.use('/api', routesElement)
app.use('/api', routesImage)
app.use('/api', routesOrder)


app.listen( process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})

