const { default: mongoose } = require('mongoose')
const form = require('../models/form')
// const form = require('../models/form')

const allowedType = ['text', 'radio', 'checkbox', 'dropdown', 'email']

const createQuestion = async (req, res) => {
    try {
        if (!req.params.id) {
            throw { code: 400, message: 'REQUIRED_FORM_ID' }
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw { code: 400, message: 'INVALID_ID' }
        }
        const newQuestion = {
            id: new mongoose.Types.ObjectId(),
            question: null,
            type: 'Text',
            required: false,
            options: []
        }
        console.log('ini isi newQuestion : ', newQuestion)
        //update form
        const targetForm = await form.findOneAndUpdate({ _id: req.params.id, userId: req.jwt.id }, { $push: { questions: newQuestion } }, { new: true })
        return res.status(200).json({
            status: true,
            message: 'ADD_QUESTION_SUCCESS',
            question: newQuestion
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

const updateQuestion = async (req, res) => {
    try {
        if (!req.params.id) {
            throw { code: 400, message: 'REQUIRED_FORM_ID' }
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) {
            throw { code: 400, message: 'INVALID_FORM_ID' }
        }
        if (!req.params.id) {
            throw { code: 400, message: 'REQUIRED_QUESTION_ID' }
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) {
            throw { code: 400, message: 'INVALID_QUESTION_ID' }
        }
        //$[indexQuestion] karena tipe datanya berupa array,
        //indexQuestion tsb didefinisikan di arrayFilter
        let field = {}
        if (req.body.hasOwnProperty('question')) {
            console.log('masuk sini question : ', req.body.question)
            field['questions.$[indexQuestion].question'] = req.body.question
        } if (req.body.hasOwnProperty('required')) {
            console.log('masuk sini required : ', req.body.required)
            field['questions.$[indexQuestion].required'] = req.body.required
        } if (req.body.hasOwnProperty('type')) {
            if (!allowedType.includes(req.body.type)) {
                throw {
                    code: 400, message: 'INVALID_TYPE'
                }
            }
            field['questions.$[indexQuestion].type'] = req.body.type
        }

        const targetForm = await form.findOneAndUpdate({
            _id: req.params.id,
            userId: req.jwt.id
        }, {
            $set:
                field
        },
            {
                arrayFilters: [{ 'indexQuestion.id': new mongoose.Types.ObjectId(req.params.questionId) }],
                new: true
            })

        return res.status(200).json({
            status: true,
            message: 'QUESTION_UPDATE_SUCCESS',
            targetForm
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

const deleteQuestion = async (req, res) => {
    try {
        if (!req.params.id) {
            throw { code: 400, message: 'REQUIRED_QUESTION_ID' }
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) {
            throw { code: 400, message: 'INVALID_QUESTION_ID' }
        }
        const targetQuestion = await form.findOneAndUpdate({
            _id: req.params.id,
            userId: req.jwt.id
        }, {
            $pull:
                { questions: { id: new mongoose.Types.ObjectId(req.params.questionId) } }
        })
        return res.status(200).json({
            status: true,
            message: 'QUESTION_DELETE_SUCCESS',
            targetQuestion
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

const getQuestions = async (req, res) => {
    try {
        if (!req.params.id) {
            throw { code: 400, message: 'REQUIRED_FORM_ID' }
        }
        const targetForm = await form.findOne({ _id: req.params.id, userId: req.jwt.id })
        if (!targetForm) { throw { code: 404, message: 'FORM_NOT_FOUND' } }

        return res.status(200).json({
            status: true,
            message: 'FORM_FOUND',
            targetForm
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

module.exports = { createQuestion, updateQuestion, deleteQuestion, getQuestions }