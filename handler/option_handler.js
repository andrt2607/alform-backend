const { default: mongoose } = require('mongoose')
const form = require('../models/form')

const createOption = async (req, res) => {
    try {
        if (!req.params.id) {
            throw { code: 400, message: 'REQUIRED_FORM_ID' }
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw { code: 400, message: 'INVALID_ID' }
        }
        const option = {
            id: new mongoose.Types.ObjectId(),
            value: req.body.option
        }
        await form.findOneAndUpdate({ _id: req.params.id, userId: req.jwt.id },
            { $push: { "questions.$[indexQuestion].options": option } }, { arrayFilters: [{ "indexQuestion.id": new mongoose.Types.ObjectId(req.params.questionId) }], new: true })
        return res.status(200).json({
            status: true,
            message: 'ADD_OPTION_SUCCESS',
            option
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

//still error
const updateOption = async (req, res) => {
    try {
        if (!req.params.id) {
            throw { code: 400, message: 'REQUIRED_FORM_ID' }
        }
        if (!req.params.questionId) {
            throw { code: 400, message: 'REQUIRED_QUESTION_ID' }
        }
        if (!req.params.optionId) {
            throw { code: 400, message: 'REQUIRED_OPTION_ID' }
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw { code: 400, message: 'INVALID_FORM_ID' }
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) {
            throw { code: 400, message: 'INVALID_QUESTION_ID' }
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.optionId)) {
            throw { code: 400, message: 'INVALID_OPTION_ID' }
        }
        const targetForm = await form.findOneAndUpdate({ _id: req.params.id, userId: req.jwt.id },
            { $set: { "questions.$[indexQuestion].options.$[indexOption].value": req.body.option } },
            {
                arrayFilters: [
                    { "indexQuestion.id": new mongoose.Types.ObjectId(req.params.questionId) },
                    { "indexOption.id": new mongoose.Types.ObjectId(req.params.optionId) }
                ],
                new: true
            })
        return res.status(200).json({
            status: true,
            message: 'UPDATE_OPTION_SUCCESS',
            option: {
                id: req.params.optionId,
                value: req.body.option
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

const deleteOption = async (req, res) => {
    try {
        if (!req.params.id) {
            throw { code: 400, message: 'REQUIRED_FORM_ID' }
        }
        if (!req.params.questionId) {
            throw { code: 400, message: 'REQUIRED_QUESTION_ID' }
        }
        if (!req.params.optionId) {
            throw { code: 400, message: 'REQUIRED_OPTION_ID' }
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw { code: 400, message: 'INVALID_FORM_ID' }
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) {
            throw { code: 400, message: 'INVALID_QUESTION_ID' }
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.optionId)) {
            throw { code: 400, message: 'INVALID_OPTION_ID' }
        }
        const targetForm = await form.findOneAndUpdate({ _id: req.params.id, userId: req.jwt.id },
            { $pull: { "questions.$[indexQuestion].options": {id: new mongoose.Types.ObjectId(req.params.optionId)} } },
            {
                arrayFilters: [
                    { "indexQuestion.id": new mongoose.Types.ObjectId(req.params.questionId) }
                ],
                new: true
            })
        return res.status(200).json({
            status: true,
            message: 'DELETE_OPTION_SUCCESS',
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}



module.exports = { createOption, updateOption, deleteOption }