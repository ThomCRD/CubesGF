const Comment = require('../models/comment')


const getComments =  async (req, res) => {
    try {
       let comment = await Comment.find()
      return res.json({ data: comment })
    }catch (err){
        return res.status(500).json({ message: `Database error`, error: err })
    }
}
const getComment = async (req, res) => {
  let commentId = parseInt(req.params.id)
  // Vérification du param
  if (!commentId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try{
      let comment = await Comment.findOne( { _id: req.params.id })
      if (comment === null) {
          return res.status(404).json({ message: `the comment does not exist ` })
      }
      return res.json({ data: comment })
  }catch (err){
      return res.status(500).json({ message: `Erreur database`, error: err })
  }
}
const getCommentFindMine = async (req, res) => {
  let commentId = parseInt(req.params.id)
  // Vérification du param
  if (!commentId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try{
      let comment = await Comment.find( { _iduser: req.params.id })
      if (comment === null) {
          return res.status(404).json({ message: `the comment does not exist ` })
      }
      return res.json({ data: comment })
  }catch (err){
      return res.status(500).json({ message: `Erreur database`, error: err })
  }
}
const getCommentFindByUser = async (req, res) => {
  let commentId = parseInt(req.params.id)
  // Vérification du param
  if (!commentId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try{
      let comment = await Comment.find( { _iduser: req.params.id }).populate('_idRestaurant')
      if (comment === null) {
          return res.status(404).json({ message: `the comment does not exist ` })
      }
      return res.json({ data: comment })
  }catch (err){
      return res.status(500).json({ message: `Erreur database`, error: err })
  }
}
const getCommentFindByRestaurant = async (req, res) => {
  let commentId = parseInt(req.params.id)
  // Vérification du param
  if (!commentId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try{
      let comment = await Comment.find( { _idRestaurant: req.params.id }).populate('_iduser')
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
    const { _iduser, _idRestaurant,contenuTexte,note } = req.body

    // Validation des données reçues
    if ( !_iduser || !_idRestaurant || !contenuTexte || !note) {
        return res.status(400).json({ message: `Data Missing` })
    }
    let comment = await Comment.findOne({  _iduser:_iduser, _idRestaurant:_idRestaurant,contenuTexte:contenuTexte,note:note })
    if (comment !== null) {
        return res.status(400).json({ message: `Comment existed` })
    }
    comment = await Comment.create(req.body)
    return res.json({ message: `Comment created`, data: comment })
}catch (err){
    return res.status(500).json({ message: `Database error`, error: err })
}
}
const updateComment = async (req, res) => {
  let commentId = parseInt(req.params.id)
  // Vérification du param
  if (!commentId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try {
    let comment = await Comment.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    if (comment === null) {
      return res.status(404).json({ message: `the comment does not exist ` })
  }
    return res.json({ data: comment,message:"comment removed"})
 }catch (err){
     return res.status(500).json({ message: `Comment not found`, error: err })
 }
}
const deleteComment = async (req, res) => {
  let commentId = parseInt(req.params.id)
  // Vérification du param
  if (!commentId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try {
    let comment = await Comment.findOneAndDelete({ _id: req.params.id })
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
  deleteComment,
  getCommentFindMine,
  getCommentFindByUser,
  getCommentFindByRestaurant
}
