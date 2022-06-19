const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/comment')
const checkTokenMiddleware = require('../jsonwebtoken/check')


// Method to get all comments.
router.get('/comments', commentCtrl.getComments)
// Get a comment
router.get('/comment/:id', commentCtrl.getComment)
// Get the find mine of a comment
router.get('/comment/findMine/:id', commentCtrl.getCommentFindMine)
// Find a comment by user
router.get('/comment/findByUser/:id', commentCtrl.getCommentFindByUser)
// Find a comment by its restaurant
router.get('/comment/findByRestaurant/:id', commentCtrl.getCommentFindByRestaurant)

// add a comment to the router
router.put('/comment' ,commentCtrl.createComment) 

// Update a comment
router.patch('/comment/:id',checkTokenMiddleware , commentCtrl.updateComment) 

// Delete a comment
router.delete('/comment/:id',checkTokenMiddleware , commentCtrl.deleteComment )

module.exports = router
