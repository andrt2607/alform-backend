const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    questions: {
        type: Array,
    },
    invites: {
        type: Array,
    },
    public: {
        type: Boolean,
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
    }
})

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('Form', schema)