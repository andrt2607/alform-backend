const mongoose = require('mongoose');
const dotenv = require('dotenv')

const env = dotenv.config().parsed

const connection = () => {
    mongoose.connect(`mongodb://${env.MONGODB_URI}/`, {
    dbName: env.MONGODB_NAME
});

const connection = mongoose.connection

connection.on('error', console.error.bind(console, 'Connection error : '))
connection.once('open', () => {
    console.log('Connected to Mongo Db');
})
}

module.exports = connection