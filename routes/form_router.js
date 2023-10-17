const { createNewForm, showFormById, updateForm, deleteForm, index, showFormsToUser } = require("../handler/form_handler");
const { createInvite, deleteInvite, getEmailsInvited } = require("../handler/invite_handler");
const { createOption, updateOption, deleteOption } = require("../handler/option_handler");
const { createQuestion, updateQuestion, deleteQuestion, getQuestions } = require("../handler/question_handler");
const { getResponses, summaries } = require("../handler/response_handler");
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
//invites
router.get('/:id/invites', authenticateJWT, getEmailsInvited)
router.post('/:id/invites', authenticateJWT, createInvite)
router.delete('/:id/invites', authenticateJWT, deleteInvite)
//responses
router.get('/responses/:id/lists', authenticateJWT, getResponses)
router.get('/responses/:id/summaries', authenticateJWT, summaries)

module.exports = router