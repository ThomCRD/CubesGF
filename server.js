const express = require('express');
require('dotenv').config();
const routes = require('./API/routes/comment');

require('./Config/db')



const app = express();
app.use(express.json()); // Parse Json

app.use('/api', routes)

app.listen( process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})

