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

// Extends the express app with a new app.
const app = express();
app.use(express.json()); // Parse Json

// connextion a la base de données
require('./Config/db')
const passport = require("passport");
app.use(passport.initialize());
require("./API/middlewares/passport")(passport);

// Applies CORS to the application.
app.use(cors())
// Applies the extended parser to the request body.
app.use(bodyParser.urlencoded({ extended: true }));

// Applies the api routes.
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


// Starts the server.
app.listen( process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})

