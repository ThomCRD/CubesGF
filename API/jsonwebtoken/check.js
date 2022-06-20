const jwt = require('jsonwebtoken')


/********************* */
/*******************Token Extract */

/********************* */
/*******************isolate the token */
const extractBearer = authorization => {

        // Returns true if the authorization is a string.
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

        // Get a Not Token.
    if(!token){
        return res.status(401).json({message:`Not Token`})
    }
    // Vérification de la validité
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        console.log(decodedToken)
        if(err){
            return res.status(401).json({message: `Wrong Token`})
        }
        next()
    })
}
module.exports = checkTokenMiddleware