const mongoose = require('mongoose')
const Schema = mongoose.Schema

const textValidate = {
    validator: v => v.length <= 1000,
    message: 'Review up to 1000 words!'
}

const ReviewSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: 'accounts',
        required: [true, 'Account is required!']
    },
    vote: {
        type: Number,
        min: [1, 'Vote no less than 1'],
        max: [5, 'vote no more than 5']
    },
    text: {
        type: String,
        validate: textValidate
    },
    images: [{
        type: String
    }],

    likes: [{
        type: Schema.Types.ObjectId
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
    }],
    tourism: {
        type: Schema.Types.ObjectId,
        ref: 'tourisms'
    },
    resort: {
        type: Schema.Types.ObjectId,
        ref: 'resorts'
    }
}, {
    timestamps: true
})

const ReviewModel = mongoose.model('reviews', ReviewSchema)
module.exports = ReviewModel