const express = require('express');
require('dotenv').config();
const routesComment = require('./API/routes/comment');
const routesMenu = require('./API/routes/menu');
const routesUser = require('./API/routes/user');
const routesAuth = require('./API/routes/auth');

require('./Config/db')


const app = express();
app.use(express.json()); // Parse Json

app.use('/api', routesComment)
app.use('/api', routesMenu)
app.use('/api', routesUser)
app.use('/api', routesAuth)

app.listen( process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})

