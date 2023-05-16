const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'accounts',
        required: [true, 'AccountId is required!']
    },
    text: {
        type: String
    },
    images: [{
        type: String
    }],

    like: [{
        type: Schema.Types.ObjectId,
        ref: 'accounts'
    }],
    dislike: [{
        type: Schema.Types.ObjectId,
        ref: 'accounts'
    }]
}, {
    timestamps: true
})

const ReviewModel = mongoose.model('reviews', ReviewSchema)
module.exports = ReviewModel