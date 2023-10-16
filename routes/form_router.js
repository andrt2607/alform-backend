const { createNewForm, showFormById, updateForm, deleteForm, index, showFormsToUser } = require("../handler/form_handler");
const { createOption, updateOption, deleteOption } = require("../handler/option_handler");
const { createQuestion, updateQuestion, deleteQuestion, getQuestions } = require("../handler/question_handler");
const { authenticateJWT } = require("../middlewares/auth_middleware");

var router = require("express").Router();
//question
router.get('/', authenticateJWT, index)
router.post('/:id/question', authenticateJWT, createQuestion)
router.put('/:id/question/:questionId', authenticateJWT, updateQuestion)
router.delete('/:id/question/:questionId', authenticateJWT, deleteQuestion)
router.get('/:id/questions', authenticateJWT, getQuestions)
//form
router.post('/', authenticateJWT, createNewForm)
router.get('/:id', authenticateJWT, showFormById)
router.get('/:id/users', authenticateJWT, showFormsToUser)
router.put('/:id', authenticateJWT, updateForm)
router.delete('/:id', authenticateJWT, deleteForm)
//option
router.post('/:id/questions/:questionId/options', authenticateJWT, createOption)
router.put('/:id/questions/:questionId/options/:optionId', authenticateJWT, updateOption)
router.delete('/:id/questions/:questionId/options/:optionId', authenticateJWT, deleteOption)


module.exports = router