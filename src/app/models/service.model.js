const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServiceSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        required: [true, 'Creater is required!']
    },
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    resort: {
        type: Schema.Types.ObjectId,
        ref: 'resorts',
        required: [true, 'Resort is required!']
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