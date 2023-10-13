const { createNewForm, showFormById, updateForm, deleteForm, index } = require("../handler/form_handler");
const { createQuestion, updateQuestion } = require("../handler/question_handler");
const { authenticateJWT } = require("../middlewares/auth_middleware");

var router = require("express").Router();

router.get('/', authenticateJWT, index)
router.post('/:id/question', authenticateJWT, createQuestion)
router.put('/:id/question/:questionId', authenticateJWT, updateQuestion)
router.post('/', authenticateJWT, createNewForm)
router.get('/:id', authenticateJWT, showFormById)
router.put('/:id', authenticateJWT, updateForm)
router.delete('/:id', authenticateJWT, deleteForm)


module.exports = router