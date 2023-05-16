const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResortSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tourismId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    address: {
        type: String
    },
    reservationLimit: {
        type: Number,
        required: true
    },
    reservations: [{
        type: Schema.Types.ObjectId,
        ref: 'accounts'
    }],
    phone: {
        type: String
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'reviews'
    }],
    rate: [{
        accountId: { type: Schema.Types.ObjectId },
        vote: { type: Number }
    }]
}, {
    timestamps: true
})

const ResortModel = mongoose.model('resorts', ResortSchema)
module.exports = ResortModel