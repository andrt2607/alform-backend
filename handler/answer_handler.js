const answer = require("../models/answer");
const { default: mongoose } = require("mongoose");
const { answerDuplicate } = require("../utils/answer_duplicate");
const { questionRequiredButEmpty } = require("../utils/question_required_but_empty");
const form = require("../models/form");
const { optionValueNotExist } = require("../utils/option_value_not_exist");
const { questionIdNotValid } = require("../utils/question_id_not_valid");
const { emailNotValid } = require("../utils/email_not_valid");

const createAnswer = async (req, res) => {
    try {
        if (!req.params.id) {
            throw { code: 400, message: "REQUIRED_FORM_ID" };
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw { code: 400, message: "INVALID_ID" };
        }

        const targetForm = await form.findById(req.params.id)
        console.log('ini isi form yg dicari : ', targetForm)

        //untuk mengecek apakah duplicate answer
        const isDuplicate = await answerDuplicate(req.body.answers)
        if(isDuplicate) {throw {code:400, message: 'DUPLICATE_ANSWER'}}
        
        //jika value di object tiap answer kosong
        const questionRequired = await questionRequiredButEmpty(targetForm, req.body.answers)
        if(questionRequired) {throw {code:400, message: 'QUESTION_REQUIRED_BUT_EMPTY'}}
        
        //jika question type nya radio atau dropdown, 
        const optionNotExist = await optionValueNotExist(targetForm, req.body.answers)
        if(optionNotExist) {throw {code:400, message: 'OPTION_VALUE_NOT_EXIST', question: optionNotExist}}

        const questionNotExist = await questionIdNotValid(targetForm, req.body.answers)
        if(questionNotExist) {throw {code:400, message: 'QUESTION_IS_NOT_EXIST', question: questionNotExist}}
        
        const emailIsNotValid = await emailNotValid(targetForm, req.body.answers)
        if(emailIsNotValid) {throw {code:400, message: 'EMAIL_IS_NOT_VALID', question: emailIsNotValid}}

        let fields = {}
        //mapping jawaban untuk masuk db
        req.body.answers.forEach(answer => {
            //questionId nya menjadi key di object answer
            fields[answer.questionId] = answer.value
        })

        const targetAnswer = await answer.create({
            formId: req.params.formId,
            userId: req.jwt.id,
            ...fields
        })

        return res.status(200).json({
            status: true,
            message: 'ANSWER_SUCCESS',
            targetAnswer
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'FAIL_CREATE_ANSWER',
            data: error.message
        })
    }
}

module.exports = { createAnswer }