const bcrypt = require('bcrypt')

const Account = require('../models/account.model')

const PASSWORD_REGEX = /^[0-9a-zA-Z]{8,}$/

class AccountController {

    constructor() { }

    async register(req, res, next) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashPass = await bcrypt.hash(req.body.password, salt)

            req.body.password = hashPass

            const newAccount = new Account(req.body)

            await newAccount.save()
            return res.json(newAccount)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }

    async login(req, res, next) {
        try {
            if (!req.body.username) {
                return res.json({
                    'username': { message: 'Username does not exist!' }
                })
            }

            var account = await Account.findOne({ username: req.body.username })

            var password = req.body.password
            var isValidPass = await bcrypt.compare(password ? password : '', account.password)

            if (!isValidPass) {
                return res.json({
                    'password': { message: 'Password is not correct!' }
                })
            }

            return res.json(account)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }

    async update(req, res, next) {
        try {
            if (!req.body.username) {
                return res.json({
                    'username': { message: 'Username does not exist!' }
                })
            }

            var account = await Account.findOne({ username: req.body.username })
            if (!account) { return res.json({ 'account': { message: 'Account does not exist!' } }) }

            await Account.updateOne({ username: req.body.username }, req.body)

            return res.json(req.body)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }

    async changePass(req, res, next) {
        try {
            if (!req.body.username) {
                return res.json({
                    'username': { message: 'Username does not exist!' }
                })
            }

            var account = await Account.findOne({ username: req.body.username })
            if (!account) { return res.json({ 'account': { message: 'Account does not exist!' } }) }

            var password = req.body.password
            var isValidPass = await bcrypt.compare(password ? password : '', account.password)

            if (!isValidPass) {
                return res.json({
                    'password': { message: 'Password is not correct!' }
                })
            }

            var newpass = req.body.newpass
            newpass = newpass ? newpass : req.body.password

            if (!PASSWORD_REGEX.test(newpass)) {
                return res.json({ 'newpass': { message: 'Invalid password!' } })
            }

            const salt = await bcrypt.genSalt(10)
            const hashPass = await bcrypt.hash(newpass, salt)

            await Account.updateOne({ username: req.body.username }, { password: hashPass })

            res.json(account)
        }
        catch (err) {
            res.json({ err: err.errors })
        }
    }
}

module.exports = new AccountController