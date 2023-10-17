const { default: mongoose } = require("mongoose");
const answer = require("../models/answer");
const form = require("../models/form");

const getResponses = async (req, res) => {
    try {
        if (!req.params.id) {
            throw { code: 400, message: "REQUIRED_FORM_ID" };
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw { code: 400, message: "INVALID_ID" };
        }
        const targetForm = await form.findOne({ _id: req.params.id, userId: req.jwt.id}).populate('answers')

        // const targetAnswer = await answer.find({formId: req.params.id})
        return res.status(200).json({
            status: true,
            message: 'ANSWER_FOUND',
            // total: targetFormtargetAnswer.length,
            form: targetForm,
            answer: targetForm.answer
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'FAIL_GET_RESPONSES',
            data: error.message
        })
    }
}

const summaries = async (req, res) => {
    try {
        if (!req.params.id) {
            throw { code: 400, message: "REQUIRED_FORM_ID" };
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw { code: 400, message: "INVALID_ID" };
        }
        const targetForm = await form.findOne({ _id: req.params.id, userId: req.jwt.id}).populate('answers')
        const summaries = targetForm.questions.map(question => {
            const summary = {
                type: question.type,
                questionId: question.id,
                question: question.question,
                answer: targetForm.answer.map((answer) => answer[question.id])
            }   
            return summary
        })
        // const targetAnswer = await answer.find({formId: req.params.id})
        return res.status(200).json({
            status: true,
            message: 'GET_SUMMARIES_SUCCESS',
            summaries
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'FAIL_GET_SUMMARIES',
            data: error.message
        })
    }
}

module.exports = {getResponses, summaries}