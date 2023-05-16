const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PHONE_REGEX = /^0\d{9}$/

const phoneValidate = {
    validator: v => PHONE_REGEX.test(v),
    message: props => `${props.value} is not a valid phone number!`
}

const ResortSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Resort name is required!']
    },
    tourismId: {
        type: Schema.Types.ObjectId,
        required: [true, 'Resort name is required!']
    },
    price: {
        type: Number,
        min: [100000, 'Price no less than 100000'],
        required: [true, 'Price is required!']
    },
    address: {
        type: String
    },
    reservationLimit: {
        type: Number,
        min: [0, 'Limit no less than 0'],
        required: [true, 'Limit is required!']
    },
    reservations: [{
        type: Schema.Types.ObjectId,
        ref: 'accounts'
    }],
    phone: {
        type: String,
        validate: phoneValidate
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'reviews'
    }],
    rate: [{
        accountId: { type: Schema.Types.ObjectId },
        vote: {
            type: Number,
            min: [1, 'Vote no less than 1'],
            max: [5, 'vote no more than 5']
        }
    }]
}, {
    timestamps: true
})

const ResortModel = mongoose.model('resorts', ResortSchema)
module.exports = ResortModel