const Comment = require('../models/comment')


const getComments =  async (req, res) => {
  Comment.find()  
    try {
       let comment = await Comment.find()
      return res.json({ data: comment })
    }catch (err){
        return res.status(500).json({ message: `Database error`, error: err })
    }
}
const getComment = async (req, res) => {
  let commentId = parseInt(req.params.commentID)
  // Vérification du param
  if (!commentId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try{
      let comment = await Comment.findOne( { _id: commentId })
      if (comment === null) {
          return res.status(404).json({ message: `the comment does not exist ` })
      }
      return res.json({ data: comment })
  }catch (err){
      return res.status(500).json({ message: `Erreur database`, error: err })
  }
}
const createComment = async (req, res) => {
  try {
    const { _id, _iduser, _idRestaurant,ContenuTexte,Note } = req.body

    // Validation des données reçues
    if ( !_id || !_iduser || !_idRestaurant || !ContenuTexte || !Note) {
        return res.status(400).json({ message: `Data Missing` })
    }
    let comment = await Comment.findOne({ _id: _id })
    if (comment !== null) {
        return res.status(400).json({ message: `Comment :${_id} existed` })
    }
    comment = await Comment.create(req.body)
    return res.json({ message: `Comment created`, data: comment })
}catch (err){
    return res.status(500).json({ message: `Database error`, error: err })
}
}
const updateComment = async (req, res) => {
  let commentId = parseInt(req.params.commentID)
  // Vérification du param
  if (!commentId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try {
    let comment = await Comment.findOneAndUpdate({ _id: req.params.commentID }, req.body, { new: true, runValidators: true })
    if (comment === null) {
      return res.status(404).json({ message: `the comment does not exist ` })
  }
    return res.json({ data: comment })
 }catch (err){
     return res.status(500).json({ message: `Comment not found`, error: err })
 }
}
const deleteComment = async (req, res) => {
  let commentId = parseInt(req.params.commentID)
  // Vérification du param
  if (!commentId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try {
    let comment = await Comment.findOneAndDelete({ _id: req.params.commentID })
    if (comment === null) {
      return res.status(404).json({ message: `the comment does not exist ` })
  }
    return res.json({ data: comment ,message:"Comment removed"})
 }catch (err){
     return res.status(500).json({ message: `Comment not found`, error: err })
 }
}
module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
}
