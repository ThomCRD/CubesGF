const Promotion = require('../models/promotion')


const getAllPromotions = async (req, res) => {
    try {
        let promotion = await Promotion.find()
        return res.json({ data: promotion })
    } catch (err) {
        return res.status(500).json({ message: `Database error`, error: err })
    }
}
const getPromotion = async (req, res) => {
    let promotionId = parseInt(req.params.id)
    // Vérification du param
    if (!promotionId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let promotion = await Promotion.findOne({ _id: req.params.id })
        if (promotion === null) {
            return res.status(404).json({ message: `the promotion does not exist ` })
        }
        return res.json({ data: promotion })
    } catch (err) {
        return res.status(500).json({ message: `Erreur database`, error: err })
    }
}
const createPromotion = async (req, res) => {
    try {
        const { menus, start_date, end_date, price } = req.body

        // Validation des données reçues
        if (!menus || !start_date || !end_date || !price) {
            return res.status(400).json({ message: `Data Missing` })
        }
        let promotion = await Promotion.findOne({ menus: menus, start_date: start_date, end_date: end_date, price: price })
        if (promotion !== null) {
            return res.status(400).json({ message: `Promotion existed` })
        }
        promotion = await Promotion.create(req.body)
        return res.json({ message: `Promotion created`, data: promotion })
    } catch (err) {
        return res.status(500).json({ message: `Database error`, error: err })
    }
}
const updatePromotion = async (req, res) => {
    let promotionId = parseInt(req.params.id)
    // Vérification du param
    if (!promotionId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let promotion = await Promotion.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        if (promotion === null) {
            return res.status(404).json({ message: `the promotion does not exist ` })
        }
        return res.json({ data: promotion, message: "promotion removed" })
    } catch (err) {
        return res.status(500).json({ message: `Promotion not found`, error: err })
    }
}
const deletePromotion = async (req, res) => {
    let promotionId = parseInt(req.params.id)
    // Vérification du param
    if (!promotionId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let promotion = await Promotion.findOneAndDelete({ _id: req.params.id })
        if (promotion === null) {
            return res.status(404).json({ message: `the promotion does not exist ` })
        }
        return res.json({ data: promotion, message: "Promotion removed" })
    } catch (err) {
        return res.status(500).json({ message: `Promotion not found`, error: err })
    }
}
module.exports = {
    getAllPromotions,
    getPromotion,
    createPromotion,
    updatePromotion,
    deletePromotion
}
