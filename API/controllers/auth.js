const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.sendLogin = (req, res) => {
    const {email, password} = req.body

    //Validation de données
    if(!email || !password){
        return res.status(400).json({ message: `wrong password` })
    }
    User.findOne({ where: {email:email}, raw:true})
        .then(user => {
            if(!user === null){
                return res.status(401).json({message: `Wrong email`})
            }

            let test = User.checkPassword(password, user.password)
                    if(!test){
                        return res.status(401).json({message: `Wrong password`})
                    }
                    //génération du token
                    const token = jwt.sign({
                        id: user.id,
                        nom:user.nom,
                        prenom:user.prenom
                    }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_DURING})

                    return res.json({access_token: token})
                })
                .catch(err => res.status(500).json({message:`login process error`,error: err}))
        }
