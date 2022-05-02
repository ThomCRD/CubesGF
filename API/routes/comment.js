const express = require('express')
const router = express.Router()

const  { 
    getComments,
    getComment,
    createComment,
    updateComment,
    deleteComment 
} = require('../controllers/comment')

router.get('/comment', getComments)

router.get('/comment/:commentID', getComment)

router.post('/comment', createComment) 

router.put('/comment/:commentID', updateComment) 

router.delete('/comment/:commentID', deleteComment )

module.exports = router
