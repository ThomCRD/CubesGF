const express = require('express');
require('dotenv').config();
const routesComment = require('./API/routes/comment');
const routesUser = require('./API/routes/user');
const routesAuth = require('./API/routes/auth');
const routesAdress = require('./API/routes/adress');
const routesRestaurant = require('./API/routes/restaurant');
const routesElement = require('./API/routes/element');
const cors = require('cors')
const routesImage = require('./API/routes/image');
const routesOrder = require('./API/routes/order');
const routesPromotion = require('./API/routes/promotion');
const routesMenu = require('./API/routes/menu');
const bodyParser = require("body-parser");

const app = express();
app.use(express.json()); // Parse Json

// connextion a la base de données
require('./Config/db')
const passport = require("passport");
app.use(passport.initialize());
require("./API/middlewares/passport")(passport);

const app = express();
app.use(cors())
app.use(express.json()); // Parse Json
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routesComment)
app.use('/api', routesUser)
app.use('/api', routesAuth)
app.use('/api', routesAdress)
app.use('/api', routesRestaurant)
app.use('/api', routesElement)
app.use('/api', routesImage)
app.use('/api', routesOrder)
app.use('/api', routesPromotion)
app.use('/api', routesMenu)


app.listen( process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})

