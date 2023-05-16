const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    avatar: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const AccountModel = mongoose.model('accounts', AccountSchema)
module.exports = AccountModel