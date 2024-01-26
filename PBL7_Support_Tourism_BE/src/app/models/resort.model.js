const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PHONE_REGEX = /^0\d{9}$/

const phoneValidate = {
    validator: v => PHONE_REGEX.test(v),
    message: props => `${props.value} is not a valid phone number!`
}

const ResortSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        required: [true, 'Creater is required!']
    },
    name: {
        type: String,
        required: [true, 'Resort name is required!']
    },
    images: [{
        type: String
    }],
    about: {
        type: String
    },
    tourism: {
        type: Schema.Types.ObjectId,
        ref: 'tourisms',
        required: [true, 'Tourism is required!']
    },
    price: {
        type: Number,
        default: 0
    },
    address: {
        type: String
    },
    reservationLimit: {
        type: Number,
        default: 0,
        min: [0, 'Limit no less than 0']
    },
    reservationsNum: {
        type: Number,
        default: 0,
        min: [0, 'Limit no less than 0']
    },
    phone: {
        type: String,
        validate: phoneValidate
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

const ResortModel = mongoose.model('resorts', ResortSchema)
module.exports = ResortModel