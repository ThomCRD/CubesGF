const express = require('express');
require('dotenv').config();
const routesComment = require('./API/routes/comment');
const routesUser = require('./API/routes/user');

require('./Config/db')


const app = express();
app.use(express.json()); // Parse Json

app.use('/api', routesComment)
app.use('/api', routesUser)

app.listen( process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})

