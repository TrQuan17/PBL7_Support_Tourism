const jwt = require('jsonwebtoken')
const { responseJson } = require('../../config/response')
const Account = require('../models/account.model')

const verifyAccount = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        const payload = jwt.verify(token, process.env.SECRET_KEY)

        const account = await Account.findOne({ _id: payload.account_id })
        if (!account) {
            const err = { verify: { message: 'Account does not verify!' } }
            return res.json(responseJson(false, err))
        }

        res.data = { account }

        return next()
    }
    catch (err) {
        console.log(err)
        return res.json(responseJson(false, err.errors))
    }
}

const verifyAdminRole = async (req, res, next) => {
    const account = res.data.account

    if(account.role === 'admin') return next()

    const err = { permission: { message: 'Denied access!' } }
    return res.json(responseJson(false, err))
}

const verifyManagerRole = async (req, res, next) => {
    const account = res.data.account

    if(account.role === 'manager' || account.role === 'admin') return next()

    const err = { permission: { message: 'Denied access!' } }
    return res.json(responseJson(false, err))
}

module.exports = {
    verifyAccount,
    verifyAdminRole,
    verifyManagerRole
}