const Menu = require('../models/menu')


const getAllMenu = async (req, res) => {
    try {
        let menu = await Menu.find()
        return res.json({ data: menu })
    } catch (err) {
        return res.status(500).json({ message: `Database error`, error: err })
    }
}
const getMenu = async (req, res) => {
    let menuId = parseInt(req.params.id)
    // Vérification du param
    if (!menuId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let menu = await Menu.findOne({ _id: req.params.id })
        if (menu === null) {
            return res.status(404).json({ message: `the menu does not exist ` })
        }
        return res.json({ data: menu })
    } catch (err) {
        return res.status(500).json({ message: `Erreur database`, error: err })
    }
}
const createMenu = async (req, res) => {
    try {
        const { promotions, photo, name, ingredient, price } = req.body

        // Validation des données reçues
        if (!promotions || !photo || !name || !ingredient || !price) {
            return res.status(400).json({ message: `Data Missing` })
        }
        let menu = await Menu.findOne({ promotions: promotions, photo: photo, name: name, ingredient: ingredient, price: price })
        if (menu !== null) {
            return res.status(400).json({ message: `Menu existed` })
        }
        menu = await Menu.create(req.body)
        return res.json({ message: `Menu created`, data: menu })
    } catch (err) {
        return res.status(500).json({ message: `Database error`, error: err })
    }
}
const updateMenu = async (req, res) => {
    let menuId = parseInt(req.params.id)
    // Vérification du param
    if (!menuId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let menu = await Menu.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        if (menu === null) {
            return res.status(404).json({ message: `the menu does not exist ` })
        }
        return res.json({ data: menu, message: "menu removed" })
    } catch (err) {
        return res.status(500).json({ message: `Menu not found`, error: err })
    }
}
const deleteMenu = async (req, res) => {
    let menuId = parseInt(req.params.id)
    // Vérification du param
    if (!menuId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let menu = await Menu.findOneAndDelete({ _id: req.params.id })
        if (menu === null) {
            return res.status(404).json({ message: `the menu does not exist ` })
        }
        return res.json({ data: menu, message: "Menu removed" })
    } catch (err) {
        return res.status(500).json({ message: `Menu not found`, error: err })
    }
}
module.exports = {
    getAllMenu,
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu
}
