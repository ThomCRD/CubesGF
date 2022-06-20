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
// Get an address by id.
const getAdress = async (req, res) => {
    let adressId = parseInt(req.params.id)
    // Vérification du param
    if (!adressId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try{
        let adress = await Adress.findOne( { _id: req.params.id })
        if (adress === null) {
            return res.status(404).json({ message: `the adress does not exist ` })
        }
        return res.json({ data: adress })
    }catch (err){
        return res.status(500).json({ message: `Erreur database`, error: err })
    }
  }
  // Create a new address.
const createAdress = async (req, res) => {
  try {
    const { country, city,street,postal_code } = req.body

    // Validation des données reçues
    if ( !country || !city || !street || !postal_code) {
        return res.status(400).json({ message: `Data Missing` })
    }
    let adress = await Adress.findOne({ country: country,city:city ,street:street,postal_code:postal_code})
    if (adress !== null) {
        return res.status(400).json({ message: `Adress :${country},${city},${street},${postal_code} existed` })
    }
    adress = await Adress.create(req.body)
    return res.json({ message: `Adress created`, data: adress })
}catch (err){
    return res.status(500).json({ message: `Database error`, error: err })
}
}
// Updates an address.
const updateAdress = async (req, res) => {
  let adressId = parseInt(req.params.id)
  // Vérification du param
  if (!adressId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try {
    let adress = await Adress.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    if (adress === null) {
        return res.status(404).json({ message: `the adress does not exist ` })
    }
    return res.json({message:"the address is changed", data: adress })
 }catch (err){
     return res.status(500).json({ message: `Adress not found`, error: err })
 }
}
// Delete an address
const deleteAdress = async (req, res) => {
  let adressId = parseInt(req.params.id)
  // Vérification du param
  if (!adressId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try {
    let adress = await Adress.findOneAndDelete({ _id: req.params.id })
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
