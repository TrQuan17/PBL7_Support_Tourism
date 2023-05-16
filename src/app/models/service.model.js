const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServiceSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    resortId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    about: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number
    }
}, {
    timestamps: true
})

const ServiceModel = mongoose.model('services', ServiceSchema)
module.exports = ServiceModel