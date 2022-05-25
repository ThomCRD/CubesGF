const Comment = require('../models/comment')
<<<<<<< HEAD

const getComments = ((req, res) => {
  Comment.find({})
      .then(result => res.status(200).json({ result }))
      .catch(error => res.status(500).json({msg: error}))
})

const getComment = ((req, res) => {
  Comment.findOne({ _id: req.params.commentID })
  .then(result => res.status(200).json({ result }))
  .catch(() => res.status(404).json({msg: 'Comment not found'}))
})

const createComment = ((req, res) => {
  Comment.create(req.body)
  .then(result => res.status(200).json({ result }))
  .catch((error) => res.status(500).json({msg:  error }))
})

const updateComment = ((req, res) => {
  Comment.findOneAndUpdate({ _id: req.params.commentID }, req.body, { new: true, runValidators: true })
  .then(result => res.status(200).json({ result }))
  .catch((error) => res.status(404).json({msg: 'Comment not found' }))
})

const deleteComment = ((req, res) => {
  Comment.findOneAndDelete({ _id: req.params.commentID })
  .then(result => res.status(200).json({ result }))
  .catch((error) => res.status(404).json({msg: 'Comment not found' }))
})
=======
const {cancelAwaitAfter}  = require('../../Config/promise')




const getComments =  async (req, res) => {
  Comment.find()  
    try {
       let comment = await Promise.race([Comment.find(), cancelAwaitAfter(3000)])
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
      let comment = await Promise.race([Comment.findOne( { _id: commentId }), cancelAwaitAfter(3000)])
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
    let comment = await Promise.race([Comment.findOne({ _id: _id }), cancelAwaitAfter(3000)])
    if (comment !== null) {
        return res.status(400).json({ message: `Comment :${_id} existed` })
    }
    comment = await Promise.race([Comment.create(req.body), cancelAwaitAfter(3000)])
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
    let comment = await Promise.race([Comment.findOneAndUpdate({ _id: req.params.commentID }, req.body, { new: true, runValidators: true }), cancelAwaitAfter(3000)])
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
    let comment = await Promise.race([Comment.findOneAndDelete({ _id: req.params.commentID }), cancelAwaitAfter(3000)])
    if (comment === null) {
      return res.status(404).json({ message: `the comment does not exist ` })
  }
    return res.json({ data: comment ,message:"Comment removed"})
 }catch (err){
     return res.status(500).json({ message: `Comment not found`, error: err })
 }
}
>>>>>>> 3-api-connection-for-User-collection

module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
}







// exports.getAllAdmin=(req, res) => {
//   Admin.findAll()
//         .then(admins => res.json({ data: admins }))
//         .catch(err => res.status(500).json({ message: `Erreur database`, error: err }))
// }
// //***Récupération d'un user */
// exports.getAdmin= async(req, res) => {
//     let AdminsId = parseInt(req.params.id)
//     // Vérification du param
//     if (!AdminsId) {
//         return res.status(400).json({ message: `missing params` })
//     }
//     try{
//         let admin = await Admins.findOne({ where: { id: AdminsId }, raw: true })
//         if (admin === null) {
//             return res.status(404).json({ message: `Admin not found` })
//         }
    
//         // User trouvé
//         return res.json({ data: admin })
//     }catch (err){
//         return res.status(500).json({ message: `Erreur database`, error: err })
//     }

// }
// //***Ajout d'un user */
// exports.addAdmin= async (req, res) => {
 
//     try {
//         const { mail, password, firstname, username , name } = req.body
//         // Validation des données reçues
//         if (!mail || !password || !firstname || !username || !name) {
//             return res.status(400).json({ message: `Missing Data` })
//             // verification si utilisateur existe deja
//         }
//         let admin = await Admin.findOne({ where: { mail: mail }, raw: true })
//         if (admin !== null) {
//             return res.status(409).json({ message: `this email ${mail} already exists ` })
//         }
//         admin = await Admin.create(req.body)
//         return res.json({ message: `user créé`, data: admin })
//     }catch (err){
//         return res.status(500).json({ message: `Erreur database`, error: err })
//     }
// }
// //***Modification d'un user */
// exports.modifyAdmin = async (req, res) => {
//     try {
//         let adminId = parseInt(req.params.id)
//         // Vérification du param
//         if (!adminId) {
//             return res.status(404).json({ message: `Missing params` })
//         }
//         //Vérification user
//         let admin = await Admin.findOne({ where: { id: adminId }, raw: true })
//         if (admin === null) {
//             return res.status(400).json({ message: `this admin does not exist` })
//         }

//         admin = await Admin.update(req.body, { where: { id: adminId } })
//         return res.json({ message: `modified admin`, data: admin })

//     }catch (err){
//         return res.status(500).json({ message: `Erreur database`, error: err })
//     }
// }
// //***Supression d'un user */
// exports.deleteAdmin = async (req, res) => {
//     try {
//         let adminsId = parseInt(req.params.id)
//         // Vérification du param
//         if (!adminsId) {
//             return res.status(400).json({ message: `Missing params` })
//         }
//         await User.destroy({ where: { id: adminsId }, force: true })
//         return res.status(204).json()

//     }catch (err){
//         return res.status(500).json({ message: `Erreur database`, error: err })
//     }
// }