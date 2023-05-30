const mongoose = require('mongoose')
const Schema = mongoose.Schema

const textValidate = {
    validator: v => v.length <= 1000 && v.length > 1,
    message: 'Review up to 1000 words!'
}

const titleValidate = {
    validator: v => v.length <= 250 && v.length > 2,
    message: 'Title up to 250 words!'
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
    title : {
        type: String,
        validate: titleValidate
    },
    text: {
        type: String,
        validate: textValidate
    },
    images: [{
        type: String
    }],
    time: {
        type: Schema.Types.Date
    },
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