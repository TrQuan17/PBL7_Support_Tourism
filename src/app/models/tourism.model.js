const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TourismSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        required: [true, 'Creater is required!']
    },
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
    title: {
        type: String
    },
    about: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: [true, 'Category is required!']
    },
    votesNum: {
        type: Number,
        default: 0
    },
    rate: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const TourismModel = mongoose.model('tourisms', TourismSchema)
module.exports = TourismModel