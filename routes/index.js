const router = require('express').Router()

router.use('/user', require('./user_router'))
router.use('/form', require('./form_router'))
router.use('/option', require('./form_router'))
router.use('/answer', require('./answer_router'))

module.exports = router