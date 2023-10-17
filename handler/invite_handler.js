const form = require("../models/form");
const { default: mongoose } = require("mongoose");
const user = require("../models/user");

const checkFormatEmail = (email) => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return regexEmail.test(email) === false
}

const createInvite = async (req, res) => {
    try {
        if (!req.params.id) {
            throw { code: 400, message: "REQUIRED_FORM_ID" };
        }
        if (!req.body.email) {
            throw { code: 400, message: "REQUIRED_EMAIL" };
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw { code: 400, message: "INVALID_ID" };
        }

        //check user tidak bisa invite dirinya sendiri
        const selfUser = await user.findOne({ _id: req.jwt.id, email: req.body.email })
        if (selfUser) { throw { code: 400, message: 'CANT_INVITE_YOURSELF' } }

        //check apakah sudah diinvite apa blum
        //invites : untuk mencari di array invites apakah ada email yang sama (setidaknya satu)
        const emailInvited = await form.findOne({
            _id: req.params.id, userId: req.jwt.id,
            invites: { "$in": req.body.email }
        })
        if (emailInvited) { throw { code: 400, message: 'EMAIL_ALREADY_INVITED' } }
        if (checkFormatEmail(req.body.email)) {
            throw { code: 400, message: 'INVALID_FORMAT_EMAIL' }
        }

        await form.findOneAndUpdate({ _id: req.params.id, userId: req.jwt.id },
            { $push: { invites: req.body.email } }, { new: true })
        return res.status(200).json({
            status: true,
            message: 'INVITE_SUCCESS',
            email: req.body.email
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'FAIL_CREATE_INVITE',
            data: error.message
        })
    }
}

const deleteInvite = async (req, res) => {
    try {
        if (!req.params.id) {
            throw { code: 400, message: "REQUIRED_FORM_ID" };
        }
        if (!req.body.email) {
            throw { code: 400, message: "REQUIRED_EMAIL" };
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw { code: 400, message: "INVALID_ID" };
        }
        if (checkFormatEmail(req.body.email)) {
            throw { code: 400, message: 'INVALID_FORMAT_EMAIL' }
        }
        //check is email exist
        const emailExist = await form.findOne({
            _id: req.params.id, userId: req.jwt.id,
            invites: { "$in": req.body.email }
        })
        if(!emailExist) {throw{code: 400, message: 'EMAIL_NOT_FOUND'}}
        await form.findOneAndUpdate({ userId: req.jwt.id, _id: req.params.id}, {$pull : {invites: req.body.email}}, {new: true})
        return res.status(200).json({
            status: true,
            message: 'DELETE_INVITE_SUCCESS',
            email: req.body.email
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'FAIL_DELETE_INVITE',
            data: error.message
        })
    }
}

const getEmailsInvited = async (req, res) => {
    try {
        if (!req.params.id) {
            throw { code: 400, message: "REQUIRED_FORM_ID" };
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw { code: 400, message: "INVALID_ID" };
        }
        const emailsInvited = await form.findOne({
            _id: req.params.id, userId: req.jwt.id
        }).select("invites")
        return res.status(200).json({
            status:true,
            message: 'INVITES_FOUND',
            invites: emailsInvited.invites
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'FAIL_GET_INVITED_EMAILS',
            data: error.message
        })
    }
}

module.exports = { createInvite, deleteInvite, getEmailsInvited }