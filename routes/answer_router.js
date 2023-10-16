const { createAnswer } = require("../handler/answer_handler");
const { authenticateJWT } = require("../middlewares/auth_middleware");

var router = require("express").Router();

router.post('/:id', authenticateJWT, createAnswer)

module.exports = router