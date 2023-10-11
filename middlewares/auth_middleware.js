const jsonwebtoken = require('jsonwebtoken')
const dotenv = require('dotenv')

const env = dotenv.config().parsed

const authenticateJWT = async (req, res, next) => {
    try {
        if(!req.headers.authorization) { throw { code: 401, message: 'UNAUTHORIZED'}}
        const token = req.headers.authorization.split(' ')[1]
        const verify = jsonwebtoken.verify(token, env.JWT_ACCESS_TOKEN_SECRET)
        req.jwt = verify
        next()
    } catch (error) {
        if(error.message == 'jwt expired'){
            error.message = 'ACCESS_TOKEN_EXPIRED'
        }else if(error.message == 'invalid signature' || error.message == 'jwt malformed' || error.message == 'jwt must be provided' || error.message == 'invalid token'){
            error.message = 'INVALID_ACCESS_TOKEN'
        }
        return res.status(401).json({
            status: false,
            message: 'AUTHENTICATE_FAILED'
        })
    }
}

module.exports = {authenticateJWT}