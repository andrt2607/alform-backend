const { createNewForm, showFormById, updateForm } = require("../handler/form_handler");
const { authenticateJWT } = require("../middlewares/auth_middleware");

var router = require("express").Router();

router.post('/', authenticateJWT, createNewForm)
router.get('/:id', authenticateJWT, showFormById)
router.put('/:id', authenticateJWT, updateForm)


module.exports = router