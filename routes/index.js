const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('../swagger')

router.use('/user', require('./user_router'))
router.use('/form', require('./form_router'))
router.use('/option', require('./form_router'))
router.use('/answer', require('./answer_router'))
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = router