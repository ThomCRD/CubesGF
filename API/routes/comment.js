const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/comment')
const checkTokenMiddleware = require('../jsonwebtoken/check')


router.get('/comments', commentCtrl.getComments)
router.get('/comment/:id', commentCtrl.getComment)
router.get('/comment/findMine/:id', commentCtrl.getCommentFindMine)
router.get('/comment/findByUser/:id', commentCtrl.getCommentFindByUser)
router.get('/comment/findByRestaurant/:id', commentCtrl.getCommentFindByRestaurant)

router.put('/comment' ,commentCtrl.createComment) 

router.patch('/comment/:id',checkTokenMiddleware , commentCtrl.updateComment) 

router.delete('/comment/:id',checkTokenMiddleware , commentCtrl.deleteComment )

module.exports = router
