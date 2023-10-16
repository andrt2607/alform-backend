const mongoose = require('mongoose')
// const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    formId: {
        type: String,
    },
    createdAt: {
        type: Number,
    },
    updatedAt: {
        type: Number
    },
}, {
    timestamps: {
        currentTime: () => Math.floor(Date.now() / 1000)
    },
    //tidak terikat hanya mengisi dg 4 properti diatas saja, tapi bisa menambah dg properti lain
    strict: false
})

// schema.plugin(mongoosePaginate)

module.exports = mongoose.model('Answer', schema)