const jwt = require('jsonwebtoken')


/********************* */
/*******************Token Extract */

/********************* */
/*******************isolate the token */
const extractBearer = authorization => {

    if(typeof authorization !== 'string'){
        return false
    }
/********************* */
/*******************isolate the token */
    const matches = authorization.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

/*****************************************/
/************ Verification of token presence */

const checkTokenMiddleware = (req , res, next) =>{

    const token = req.headers.authorization && extractBearer(req.headers.authorization)
    console.log(token)

    if(!token){
        return res.status(401).json({message:`Holaa mais tu viens en soirée sans cheddar`})
    }
    // Vérification de la validité
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        console.log(decodedToken)
        if(err){
            return res.status(401).json({message: `Holaa mais c'est pas le bon cheddar ca !!!!!`})
        }
        next()
    })
}
module.exports = checkTokenMiddleware