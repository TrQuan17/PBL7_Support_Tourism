const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TourismSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Tourism name is required!']
    },
    address: {
        type: String,
        required: [true, 'Address is required!']
    },
    rate: [{
        accountId: { type: Schema.Types.ObjectId },
        vote: {
            type: Number,
            min: [1, 'Vote no less than 1'],
            max: [5, 'vote no more than 5']
        }
    }],
    images: [{
        type: String
    }],
    about: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categorys',
        required: [true, 'Category is required!']
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'reviews'
    }]
}, {
    timestamps: true
})

const TourismModel = mongoose.model('tourisms', TourismSchema)
module.exports = TourismModel