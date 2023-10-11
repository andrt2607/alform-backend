const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./database/mongoose')
const dotenv = require('dotenv')
const routes = require('./routes/index')
const morgan = require('morgan')

const env = dotenv.config().parsed
const app = express()

// const port = 3000

//parse application/json
app.use(bodyParser.json())
//parse form url
app.use(bodyParser.urlencoded({extended: false}))
//middleware morgan log all request
app.use(morgan('combined'))
app.use('/api/v1', routes)

connection()

app.listen(env.APP_PORT, () => {
    console.log(`Server is running at port ${env.APP_PORT}`);
})