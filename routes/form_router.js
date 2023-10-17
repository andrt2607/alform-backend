const { createNewForm, showFormById, updateForm, deleteForm, index, showFormsToUser } = require("../handler/form_handler");
const { createInvite, deleteInvite, getEmailsInvited } = require("../handler/invite_handler");
const { createOption, updateOption, deleteOption } = require("../handler/option_handler");
const { createQuestion, updateQuestion, deleteQuestion, getQuestions } = require("../handler/question_handler");
const { getResponses, summaries } = require("../handler/response_handler");
const { authenticateJWT } = require("../middlewares/auth_middleware");

var router = require("express").Router();
//question
/**
 * @swagger
 * /form:
 *   get:
 *     summary: get forms
 *     security:
 *       - bearerAuth: []
 *     tags: [Forms]
 *     description: get forms
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.get('/', authenticateJWT, index)
/**
 * @swagger
 * /{id}/question:
 *   post:
 *     summary: create question form
 *     security:
 *       - bearerAuth: []
 *     tags: [Questions]
 *     description: Membuat question baru
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.post('/:id/question', authenticateJWT, createQuestion)
/**
 * @swagger
 * /{id}/question/{questionId}:
 *   put:
 *     summary: update question form
 *     security:
 *       - bearerAuth: []
 *     tags: [Questions]
 *     description: update question
 *     parameters:
 *       - in : path
 *         name: id-form
 *         description: id of form
 *         schema:
 *           type: string
 *         required: true
 *       - in : path
 *         name: id-question
 *         description: id of question
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               'type':
 *                  type: string
 *               'required':
 *                  type: string
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.put('/:id/question/:questionId', authenticateJWT, updateQuestion)
/**
 * @swagger
 * /{id}/question/{questionId}:
 *   delete:
 *     summary: delete question form
 *     security:
 *       - bearerAuth: []
 *     tags: [Questions]
 *     description: delete question baru
 *     parameters:
 *       - in : path
 *         name: id-form
 *         description: id of form
 *         schema:
 *           type: string
 *         required: true
 *       - in : path
 *         name: id-question
 *         description: id of question
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.delete('/:id/question/:questionId', authenticateJWT, deleteQuestion)
/**
 * @swagger
 * /{id}/questions:
 *   get:
 *     summary: get questions by form id
 *     security:
 *       - bearerAuth: []
 *     tags: [Questions]
 *     parameters:
 *       - in : path
 *         name: id-form
 *         description: id of form
 *         schema:
 *           type: string
 *         required: true
 *     description: get questions by form id
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.get('/:id/questions', authenticateJWT, getQuestions)
//form
/**
 * @swagger
 * /form:
 *   post:
 *     summary: create new form
 *     security:
 *       - bearerAuth: []
 *     tags: [Forms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     description: Membuat form baru
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.post('/', authenticateJWT, createNewForm)
/**
 * @swagger
 * /form/{id}:
 *   get:
 *     summary: get form by id
 *     security:
 *       - bearerAuth: []
 *     tags: [Forms]
 *     parameters:
 *       - in : path
 *         name: id-form
 *         description: id of form
 *         schema:
 *           type: string
 *         required: true
 *     description: get form by id
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.get('/:id', authenticateJWT, showFormById)
/**
 * @swagger
 * /form/{id}/users:
 *   get:
 *     summary: get forms for users
 *     security:
 *       - bearerAuth: []
 *     tags: [Forms]
 *     parameters:
 *       - in : path
 *         name: id-form
 *         description: id of form
 *         schema:
 *           type: string
 *         required: true
 *     description: get forms for users
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.get('/:id/users', authenticateJWT, showFormsToUser)
/**
 * @swagger
 * /form/{id}:
 *   put:
 *     summary: update form
 *     security:
 *       - bearerAuth: []
 *     tags: [Forms]
 *     parameters:
 *       - in : path
 *         name: id-form
 *         description: id of form
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     description: update form
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.put('/:id', authenticateJWT, updateForm)
/**
 * @swagger
 * /form/{id}:
 *   delete:
 *     summary: delete form
 *     security:
 *       - bearerAuth: []
 *     tags: [Forms]
 *     parameters:
 *       - in : path
 *         name: id-form
 *         description: id of form
 *         schema:
 *           type: string
 *         required: true
 *     description: delete form
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.delete('/:id', authenticateJWT, deleteForm)
//option
/**
 * @swagger
 * /form/{id}/questions/{questionId}/options:
 *   post:
 *     summary: create option
 *     security:
 *       - bearerAuth: []
 *     tags: [Forms]
 *     parameters:
 *       - in : path
 *         name: id-form
 *         description: id of form
 *         schema:
 *           type: string
 *         required: true
 *       - in : path
 *         name: id-question
 *         description: id of question
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               option:
 *                 type: string
 *     description: create option
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.post('/:id/questions/:questionId/options', authenticateJWT, createOption)
/**
 * @swagger
 * /form/{id}/questions/{questionId}/options/{optionId}:
 *   put:
 *     summary: update option
 *     security:
 *       - bearerAuth: []
 *     tags: [Forms]
 *     parameters:
 *       - in : path
 *         name: id-form
 *         description: id of form
 *         schema:
 *           type: string
 *         required: true
 *       - in : path
 *         name: id-question
 *         description: id of question
 *         schema:
 *           type: string
 *         required: true
 *       - in : path
 *         name: id-option
 *         description: id of option
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               option:
 *                 type: string
 *     description: update option
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.put('/:id/questions/:questionId/options/:optionId', authenticateJWT, updateOption)
/**
 * @swagger
 * /form/{id}/questions/{questionId}/options/{optionId}:
 *   delete:
 *     summary: delete option
 *     security:
 *       - bearerAuth: []
 *     tags: [Forms]
 *     parameters:
 *       - in : path
 *         name: id-form
 *         description: id of form
 *         schema:
 *           type: string
 *         required: true
 *       - in : path
 *         name: id-question
 *         description: id of question
 *         schema:
 *           type: string
 *         required: true
 *       - in : path
 *         name: id-option
 *         description: id of option
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               option:
 *                 type: string
 *     description: delete option
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.delete('/:id/questions/:questionId/options/:optionId', authenticateJWT, deleteOption)
//invites
/**
 * @swagger
 * /form/{id}/invites:
 *   get:
 *     summary: get all invited emails
 *     security:
 *       - bearerAuth: []
 *     tags: [Invites]
 *     parameters:
 *       - in : path
 *         name: id-form
 *         description: id of form
 *         schema:
 *           type: string
 *         required: true
 *     description: get all invited emails
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.get('/:id/invites', authenticateJWT, getEmailsInvited)
/**
 * @swagger
 * /form/{id}/invites:
 *   post:
 *     summary: create new invites
 *     security:
 *       - bearerAuth: []
 *     tags: [Forms]
 *     parameters:
 *       - in : path
 *         name: id-form
 *         description: id of form
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     description:  create new invites
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.post('/:id/invites', authenticateJWT, createInvite)
/**
 * @swagger
 * /form/{id}/invites:
 *   delete:
 *     summary: delete 1 invite email
 *     security:
 *       - bearerAuth: []
 *     tags: [Invites]
 *     parameters:
 *       - in : path
 *         name: id-form
 *         description: id of form
 *         schema:
 *           type: string
 *         required: true
 *     description: delete 1 invite email
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.delete('/:id/invites', authenticateJWT, deleteInvite)
//responses
/**
 * @swagger
 * /form/responses/{id}/lists:
 *   get:
 *     summary: get all list response answer
 *     security:
 *       - bearerAuth: []
 *     tags: [Responses]
 *     parameters:
 *       - in : path
 *         name: id-form
 *         description: id of form
 *         schema:
 *           type: string
 *         required: true
 *     description: get all list response answer
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.get('/responses/:id/lists', authenticateJWT, getResponses)
/**
 * @swagger
 * /form/responses/{id}/summaries:
 *   get:
 *     summary: get summaries
 *     security:
 *       - bearerAuth: []
 *     tags: [Responses]
 *     parameters:
 *       - in : path
 *         name: id-form
 *         description: id of form
 *         schema:
 *           type: string
 *         required: true
 *     description: get summaries
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.get('/responses/:id/summaries', authenticateJWT, summaries)

module.exports = router