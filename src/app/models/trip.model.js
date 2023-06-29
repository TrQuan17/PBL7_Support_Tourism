const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TripSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: 'accounts',
        required: [true, 'Account is required!']
    },
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    about: {
        type: String,
        required: [true, 'About is required!']
    },
    background: {
        type: String
    },
    favourites: [{
        type: Schema.Types.ObjectId,
        ref: 'favourites'
    }]
}, {
    timestamps: true
})

const TripModel = mongoose.model('trips', TripSchema)
module.exports = TripModel
