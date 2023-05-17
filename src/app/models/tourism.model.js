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
    images: [{
        type: String
    }],
    about: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: [true, 'Category is required!']
    }
}, {
    timestamps: true
})

const TourismModel = mongoose.model('tourisms', TourismSchema)
module.exports = TourismModel