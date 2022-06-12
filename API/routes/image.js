const express = require('express')
const router = express.Router()
const imageCtrl = require('../controllers/image')
const path = require("path");
const fs = require("fs");
const Image = require('../models/image')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./API/routes/uploads");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({ storage: storage }).single("file");

router.put("/upload", upload, (req, res) => {
    const obj = {
        img: {
            data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
            contentType: "image/png"
        }
    }
    const newImage = new Image({
        image: obj.img
    });

    newImage.save((e) => {
        if (e) {
            console.log(e);
        } else {
            res.send('inserted');
        }
    });

});
router.get('/image/:id', imageCtrl.getImage)
router.get('/images', imageCtrl.getAllImages)
router.delete('/image/:id', imageCtrl.deleteImage)


module.exports = router