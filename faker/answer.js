const answer = require('../models/answer')
const connection = require('./database/mongoose')
const faker = require('@faker-js/faker')

//not yet
connection()

let data = []
for (let i = 0; i < 10; i++) {
    data.push(
        {
            '652e03186a733a61a83f96cc' : faker.fakerID_ID.name.fullName(),
            //untuk jwbn radio
            // '652e037e6a733a61a83f96ce' : faker.fakerID_ID.helpers.arrayElement(['31','45'])
            //untuk jwbn checkbox
            '652e037e6a733a61a83f96ce' : faker.fakerID_ID.helpers.arrayElement(['soto','rendang', 'migoreng']),
            'formId' : '6527bdf1bcbd0608a5c49192',
            'userId' : '6527ba6a8d80a298d1e929b3'
        }
    )
    
}

answer.insertMany(data)