const mongoose = require('mongoose')
const Schema = mongoose.Schema

const USERNAME_REGEX = /^[a-zA-Z0-9]{6,18}$/
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
const PHONE_REGEX = /^0\d{9}$/
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const usernameValidate = {
    validator: v => USERNAME_REGEX.test(v),
    message: 'Invalid username!'
}

const passwordValidate = {
    validator: v => PASSWORD_REGEX.test(v),
    message: 'Invalid password!'
}

const emailValidate = {
    validator: v => EMAIL_REGEX.test(v),
    message: props => `${props.value} is not a valid email!`
}

const phoneValidate = {
    validator: v => PHONE_REGEX.test(v),
    message: props => `${props.value} is not a valid phone number!`
}

const AccountSchema = new Schema({
    username: {
        type: String,
        unique: [true, '{VALUE} is exist!'],
        required: [true, 'Username is required!'],
        validate: usernameValidate
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        validate: passwordValidate
    },
    fullname: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    background: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String,
        unique: [true, '{VALUE} is exist!'],
        validate: emailValidate,
        required: [true, 'Email is required!']
    },
    phone: {
        type: String,
        validate: phoneValidate
    },
    birthday: {
        type: Schema.Types.Date
    },
    role: {
        type: String,
        required: [true, 'Role is required!']
    }
},
    {
        timestamps: true
    })

const AccountModel = mongoose.model('accounts', AccountSchema)
module.exports = AccountModel