const Franchise = require('../models/franchise')



const getAllFranchises = async (req, res) => {
    try {
        let franchise = await Franchise.find()
        
        return res.json({ data: franchise })
    } catch (err) {
        return res.status(500).json({ message: `Database error`, error: err })
    }
}
const getFranchise = async (req, res) => {
    let franchiseId = parseInt(req.params.id)
    // Vérification du param
    if (!franchiseId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let franchise = await Franchise.findOne({ _id: req.params.id })
        if (franchise === null) {
            return res.status(404).json({ message: `Franchise does not exist` })
        }

        return res.json({ data: franchise })
    } catch (err) {
        return res.status(500).json({ message: `Database Error`, error: err })
    }

}
const createFranchise = async (req, res) => {
    try {
        const { restaurant, headFranchise, subFranchise, siren, name,phone,email } = req.body

        // Validation des données reçues
        if ( !restaurant || !headFranchise || !subFranchise || !siren || !name || !phone || !email) {
            return res.status(400).json({ message: `Data Missing` })
        }
        let franchise = await Franchise.findOne({ siren: siren })
        if (franchise !== null) {
            return res.status(400).json({ message: `The franchise does exist` })
        }
        franchise = await Franchise.create(req.body)
        return res.json({ message: `Franchise created`, data: franchise })
    } catch (err) {
        return res.status(500).json({ message: `Database error`, error: err })
    }
}
const updateFranchise = async (req, res) => {
    let franchiseId = parseInt(req.params.id)
    // Vérification du param
    if (!franchiseId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let franchise = await Franchise.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        if (franchise === null) {
            return res.status(404).json({ message: `Franchise does not exist ` })
        }
        return res.json({ data: franchise, message: "Franchise update" })
    } catch (err) {
        return res.status(500).json({ message: `Franchise not found`, error: err })
    }
}
const deleteFranchise = async (req, res) => {
    let franchiseId = parseInt(req.params.id)
    // Vérification du param
    if (!franchiseId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let franchise = await Franchise.findOneAndDelete({ _id: req.params.id })
        if (franchise === null) {
            return res.status(404).json({ message: `Franchise does not exist ` })
        }
        return res.json({ data: franchise, message: "Franchise removed" })
    } catch (err) {
        return res.status(500).json({ message: `Franchise not found`, error: err })
    }
}

module.exports = { getAllFranchises, getFranchise, createFranchise, updateFranchise, deleteFranchise }
