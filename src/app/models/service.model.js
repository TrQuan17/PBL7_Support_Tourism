const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    resortId: {
        type: Schema.Types.ObjectId,
        required: [true, 'ResortId is required!']
    },
    about: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        min: [10000, 'Price no less than 10000']
    }
}, {
    timestamps: true
})

const ServiceModel = mongoose.model('services', ServiceSchema)
module.exports = ServiceModel