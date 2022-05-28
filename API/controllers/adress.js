const Adress = require('../models/adress')


const getadresses =  async (req, res) => {
  Adress.find()  
    try {
       let adress = await Adress.find()
      return res.json({ data: adress })
    }catch (err){
        return res.status(500).json({ message: `Database error`, error: err })
    }
}
const getAdress = async (req, res) => {
  let commentId = parseInt(req.params.adressID)
  // Vérification du param
  if (!commentId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try{
      let adress = await Adress.findOne( { _id: commentId })
      if (adress === null) {
          return res.status(404).json({ message: `the adress does not exist ` })
      }
      return res.json({ data: adress })
  }catch (err){
      return res.status(500).json({ message: `Erreur database`, error: err })
  }
}
const createAdress = async (req, res) => {
  try {
    const { _id, country, city,street,postal_code } = req.body

    // Validation des données reçues
    if ( !_id || !country || !city || !street || !postal_code) {
        return res.status(400).json({ message: `Data Missing` })
    }
    let adress = await Adress.findOne({ _id: _id })
    if (adress !== null) {
        return res.status(400).json({ message: `Adress :${_id} existed` })
    }
    adress = await Adress.create(req.body)
    return res.json({ message: `Adress created`, data: adress })
}catch (err){
    return res.status(500).json({ message: `Database error`, error: err })
}
}
const updateAdress = async (req, res) => {
  let commentId = parseInt(req.params.adressID)
  // Vérification du param
  if (!commentId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try {
    let adress = await Adress.findOneAndUpdate({ _id: req.params.adressID }, req.body, { new: true, runValidators: true })
    if (adress === null) {
      return res.status(404).json({ message: `the adress does not exist ` })
  }
    return res.json({ data: adress })
 }catch (err){
     return res.status(500).json({ message: `Adress not found`, error: err })
 }
}
const deleteAdress = async (req, res) => {
  let commentId = parseInt(req.params.adressID)
  // Vérification du param
  if (!commentId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try {
    let adress = await Adress.findOneAndDelete({ _id: req.params.adressID })
    if (adress === null) {
      return res.status(404).json({ message: `the adress does not exist ` })
  }
    return res.json({ data: adress ,message:"Adress removed"})
 }catch (err){
     return res.status(500).json({ message: `Adress not found`, error: err })
 }
}
module.exports = {
    getadresses,
    getAdress,
    createAdress,
    updateAdress,
    deleteAdress
}
