const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const sendLogin = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user === null) {
            return res.status(404).json({ message: "Wrong mail or password" })
        }
        const test = await bcrypt.compare(req.body.password, user.password)
        if (test) {
            const token = jwt.sign({
                _id: user._id,
                email: user.email,
                firstName: user.firstName
            }, process.env.JWT_SECRET, { expiresIn: 300 })
            return res.json({ access_token: token })

        } else {
            return res.status(401).json({ message: `mauvais PWD` })
        }
    } catch (err) {
        res.status(500).json({ message: `login process error`, error: err })
    }
}
module.exports = { sendLogin }