const router = require('express').Router()

router.use('/user', require('./user_router'))
router.use('/form', require('./form_router'))

module.exports = router