const User = require('../models/user')



const getAllUsers = async (req, res) => {
    User.find()
    try {
        let user = await User.find()
        
        return res.json({ data: user })
    } catch (err) {
        return res.status(500).json({ message: `Database error`, error: err })
    }
}
const getUser = async (req, res) => {
    let userId = parseInt(req.params.userID)
    // Vérification du param
    if (!userId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let user = await User.findOne({ _id: req.params.userID })
        if (user === null) {
            return res.status(404).json({ message: `User does not exist` })
        }

        return res.json({ data: user })
    } catch (err) {
        return res.status(500).json({ message: `Database Error`, error: err })
    }

}
const createUser = async (req, res) => {
    try {
        const { _id, email, password, firstName, lastName, phone } = req.body

        // Validation des données reçues
        if (!_id || !email || !password || !firstName || !lastName || !phone) {
            return res.status(400).json({ message: `Data Missing` })
        }
        let user = await User.findOne({ _id: _id })
        if (user !== null) {
            return res.status(400).json({ message: `The user :${_id} does exist` })
        }
        user = await User.create(req.body)
        return res.json({ message: `User created`, data: user })
    } catch (err) {
        return res.status(500).json({ message: `Database error`, error: err })
    }
}

const updateUser = async (req, res) => {
    let userId = parseInt(req.params.userID)
    // Vérification du param
    if (!userId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let user = await User.findOneAndUpdate({ _id: req.params.userID }, req.body, { new: true, runValidators: true })
        if (user === null) {
            return res.status(404).json({ message: `User does not exist ` })
        }
        return res.json({ data: user, message: "User update" })
    } catch (err) {
        return res.status(500).json({ message: `User not found`, error: err })
    }
}

const deleteUser = async (req, res) => {
    let userId = parseInt(req.params.userID)
    // Vérification du param
    if (!userId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let user = await User.findOneAndDelete({ _id: req.params.userID })
        if (user === null) {
            return res.status(404).json({ message: `User does not exist ` })
        }
        return res.json({ data: user, message: "User removed" })
    } catch (err) {
        return res.status(500).json({ message: `User not found`, error: err })
    }
}

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser,createUser }
