const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const passport = require('passport')
const passportConfig = require('../middlewares/authorization.middleware')

const Account = require('../models/account.model')
const { responseJson } = require('../../config/response')

const PASSWORD_REGEX = /^[0-9a-zA-Z]{8,}$/

const encodedToken = (accountId) => {
    return jwt.sign({ account_id: accountId }, process.env.SECRET_KEY, { expiresIn: '1d' })
}

class AccountController {
    async register(req, res, next) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashPass = await bcrypt.hash(req.body.password, salt)

            req.body.password = hashPass
            req.body.role = 'user'

            const newAccount = new Account(req.body)

            await newAccount.save()

            const token = encodedToken(newAccount._id)

            res.cookie('authoriztion', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(responseJson(true, newAccount))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async login(req, res, next) {
        try {
            if (!req.body.username) {
                const err = { username: { message: 'Username does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const account = await Account.findOne({ username: req.body.username })

            const password = req.body.password
            var isValidPass = await bcrypt.compare(password ? password : '', account.password)

            if (!isValidPass) {
                const err = { password: { message: 'Password is not correct!' } }
                return res.json(responseJson(false, err))
            }

            const token = encodedToken(account._id)

            res.cookie('authoriztion', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(responseJson(true, account))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.body.username) {
                const err = { username: { message: 'Username does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var account = await Account.findOne({ username: req.body.username })
            if (!account) {
                const err = { account: { message: 'Account does not exist!' } }
                return res.json(responseJson(false, err))
            }

            await Account.updateOne({ username: req.body.username }, req.body)

            return res.json(responseJson(true, req.body))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async changePass(req, res, next) {
        try {
            if (!req.body.username) {
                const err = { username: { message: 'Username does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var account = await Account.findOne({ username: req.body.username })
            if (!account) {
                const err = { account: { message: 'Account does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var password = req.body.password
            var isValidPass = await bcrypt.compare(password ? password : '', account.password)

            if (!isValidPass) {
                const err = { password: { message: 'Password is not correct!' } }
                return res.json(responseJson(false, err))
            }

            var newpass = req.body.newpass
            newpass = newpass ? newpass : req.body.password

            if (!PASSWORD_REGEX.test(newpass)) {
                const err = { 'newpass': { message: 'Invalid password!' } }
                return res.json(responseJson(false, err))
            }

            const salt = await bcrypt.genSalt(10)
            const hashPass = await bcrypt.hash(newpass, salt)

            await Account.updateOne({ username: req.body.username }, { password: hashPass })

            return res.json(responseJson(true, account))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async logout(req, res, next) {
        try {

        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new AccountController