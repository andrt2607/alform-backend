// const { default: user } = require("../models/user")

const user = require("../models/user")
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const jsonwebtoken = require('jsonwebtoken')

const env = dotenv.config().parsed

const generateAccessToken = async (payload) => {
    return jsonwebtoken.sign(payload, env.JWT_ACCESS_TOKEN_SECRET, {expiresIn : env.JWT_ACCESS_TOKEN_EXPIRE_TIME})
}

const generateRefreshToken = async (payload) => {
    return jsonwebtoken.sign(payload, env.JWT_REFRESH_TOKEN_SECRET, {expiresIn : env.JWT_REFRESH_TOKEN_EXPIRE_TIME})
}

const registerUser = async (req, res) => {
    try {
        if (!req.body.fullname) {
            throw {
                code: 400, message: 'FULLNAME_IS_REQUIRED'
            }
        } else if (!req.body.email) {
            throw {
                code: 400, message: 'EMAIL_IS_REQUIRED'
            }
        } else if (!req.body.password) {
            throw {
                code: 400, message: 'PASSWORD_IS_REQUIRED'
            }
        }
        else if (req.body.password.length <= 6) {
            throw {
                code: 400, message: 'PASSWORD_NEED_6_CHARACTERS'
            }
        }
        
        let { fullname, email, password, status } = req.body
        const emailExist = await user.findOne({ email: req.body.email })
        if (emailExist) {
            throw {
                code: 409,
                message: 'EMAIL_ALREADY_EXIST'
            }
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)
        console.log('pwd : ', hash)

        const newUser = await user.create({
            fullname,
            email,
            password:hash,
            status
        })
        console.log(newUser)
        

        return res.status(200).json({
            message: 'REGISTER_SUCCESS',
            data: newUser
        })
    } catch (error) {
        return res.status(500).json({
            message: 'REGISTER_FAILED',
            data: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        if (!req.body.email) {
            throw {
                code: 400, message: 'EMAIL_IS_REQUIRED'
            }
        } else if (!req.body.password) {
            throw {
                code: 400, message: 'PASSWORD_IS_REQUIRED'
            }
        }
        let { email, password } = req.body

        const userFromDb = await user.findOne({ email: req.body.email })
        if (!userFromDb) {
            throw {
                code: 409,
                message: 'EMAIL_NOT_EXIST'
            }
        }

        const isPasswordValid = await bcrypt.compare(password, userFromDb.password)
        if (!isPasswordValid) {
            throw {
                code: 400, message: 'INVALID_PASSWORD'
            }
        }
        const accessToken = await generateAccessToken({id: userFromDb._id})
        const refreshToken = await generateRefreshToken({id: userFromDb._id})
        return res.status(200).json({
            message: 'LOGIN_SUCCESS',
            data: userFromDb.fullname,
            accessToken,
            refreshToken
        })
    } catch (error) {
        console.log('error login : ', error.message);
        return res.status(500).json({
            message: 'LOGIN_FAILED',
            data: error.message
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        if(!req.body.refreshToken){
            throw { code: 400, message: 'REFRESH_TOKEN_IS_REQUIRED'}
        }
    
        const verify = await jsonwebtoken.verify(req.body.refreshToken, env.JWT_REFRESH_TOKEN_SECRET)

        let payload = { id: verify.id }
        const accessToken = await generateAccessToken(payload)
        const refreshToken = await generateRefreshToken(payload)
        return res.status(200).json({
            status: true,
            message: 'REFRESH_TOKEN_SUCCESS',
            accessToken,
            refreshToken
        })
    } catch (error) {
        if(error.message == 'jwt expired'){
            error.message = 'REFRESH_TOKEN_EXPIRED'
        }else if(error.message == 'invalid signature' || error.message == 'jwt malformed' || error.message == 'jwt must be provided' || error.message == 'invalid token'){
            error.message = 'INVALID_REFRESH_TOKEN'
        }
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

module.exports = { registerUser, loginUser, refreshToken }