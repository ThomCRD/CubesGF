const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/comment')
const checkTokenMiddleware = require('../jsonwebtoken/check')


router.get('/comments', commentCtrl.getComments)

router.get('/comment/:id', commentCtrl.getComment)

router.put('/comment' ,commentCtrl.createComment) 

router.patch('/comment/:id',checkTokenMiddleware , commentCtrl.updateComment) 

router.delete('/comment/:id',checkTokenMiddleware , commentCtrl.deleteComment )

module.exports = router
