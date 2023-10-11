const { registerUser, loginUser, refreshToken } = require("../handler/user_handler");

var router = require("express").Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/refreshToken', refreshToken)

module.exports = router