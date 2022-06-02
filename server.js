const express = require('express');
const multer  = require('multer')
require('dotenv').config();
const routesComment = require('./API/routes/comment');
const routesUser = require('./API/routes/user');
const routesAuth = require('./API/routes/auth');
const routesAdress = require('./API/routes/adress');
const routesRestaurant = require('./API/routes/restaurant');
const routesElement = require('./API/routes/element');
const routesImage = require('./API/routes/image');
const bodyParser = require("body-parser");




require('./Config/db')


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads");
//     },
//     filename: function (req, file, cb) {
//       cb(
//         null,
//         file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//       );
//     },
//   });
//   const upload = multer({ storage: storage }).single("file");

app.use('/api', routesComment)
app.use('/api', routesUser)
app.use('/api', routesAuth)
app.use('/api', routesAdress)
app.use('/api', routesRestaurant)
app.use('/api', routesElement)
app.use('/api', routesImage)

// app.post("/uploadPhoto", upload, (req, res) => {
//     const obj = {
//         img: {
//             data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
//             contentType: "image/png"
//         }
//     }
//     const newImage = new ImageModel({
//         image: obj.img
//     });

//     newImage.save((e) => {
//         if(e){
//         console.log(e);
//         } else{
//         res.send('inserted');
//         }
//     });
    
// });

app.listen( process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})

