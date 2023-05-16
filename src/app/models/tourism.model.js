const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TourismSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rate: [{
        accountId: { type: Schema.Types.ObjectId },
        vote: { type: Number }
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
        required: true
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