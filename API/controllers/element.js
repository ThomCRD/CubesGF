const Element = require('../models/element')


const getElements =  async (req, res) => {
    try {
       let element = await Element.find()
      return res.json({ data: element })
    }catch (err){
        return res.status(500).json({ message: `Database error`, error: err })
    }
}
const getElement = async (req, res) => {
  let elementId = parseInt(req.params.id)
  // Vérification du param
  if (!elementId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try{
      let element = await Element.findOne( { _id: req.params.id })
      if (element === null) {
          return res.status(404).json({ message: `the element does not exist ` })
      }
      return res.json({ data: element })
  }catch (err){
      return res.status(500).json({ message: `Erreur database`, error: err })
  }
}
const createElement = async (req, res) => {
  try {
    const { name,volume } = req.body

    // Validation des données reçues
    if ( !name || !volume) {
        return res.status(400).json({ message: `Data Missing` })
    }
    let element = await Element.create(req.body)
    return res.json({ message: `Element created`, data: element })
}catch (err){
    return res.status(500).json({ message: `Database error`, error: err })
}
}
const updateElement = async (req, res) => {
  let elementId = parseInt(req.params.id)
  // Vérification du param
  if (!elementId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try {
    let element = await Element.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    if (element === null) {
      return res.status(404).json({ message: `the element does not exist ` })
  }
    return res.json({ data: element,message:"element removed"})
 }catch (err){
     return res.status(500).json({ message: `Element not found`, error: err })
 }
}
const deleteElement = async (req, res) => {
  let elementId = parseInt(req.params.id)
  // Vérification du param
  if (!elementId) {
      return res.status(400).json({ message: `Parameter missing` })
  }
  try {
    let element = await Element.findOneAndDelete({ _id: req.params.id })
    if (element === null) {
      return res.status(404).json({ message: `the element does not exist ` })
  }
    return res.json({ data: element ,message:"Element removed"})
 }catch (err){
     return res.status(500).json({ message: `Element not found`, error: err })
 }
}
module.exports = {
  getElements,
  getElement,
  createElement,
  updateElement,
  deleteElement
}
