const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/comment')
const checkTokenMiddleware = require('../jsonwebtoken/check')
// const  { 
//     getComments,
//     getComment,
//     createComment,
//     updateComment,
//     deleteComment 
// } = require('../controllers/comment')

router.get('/comments', commentCtrl.getComments)

router.get('/comment/:commentID', commentCtrl.getComment)

router.put('/comment' ,checkTokenMiddleware ,commentCtrl.createComment) 

router.patch('/comment/:commentID',checkTokenMiddleware , commentCtrl.updateComment) 

router.delete('/comment/:commentID',checkTokenMiddleware , commentCtrl.deleteComment )

module.exports = router
