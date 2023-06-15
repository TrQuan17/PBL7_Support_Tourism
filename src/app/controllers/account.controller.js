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
            const newAccount = new Account(req.body)

            const salt = await bcrypt.genSalt(10)
            const hashPass = await bcrypt.hash(newAccount.password, salt)

            newAccount.password = hashPass
            newAccount.role = 'user'

            await newAccount.save()

            const data = {
                fullname: newAccount.fullname,
                avatar: newAccount.avatar,
                accessToken: encodedToken(newAccount._id),
                expiresIn: new Date().setDate(new Date().getDate() + 1)
            }
            
            return res.json(responseJson(true, data))
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
            if(!account) {
                const err = { account: { message: 'Account does not exist!' } }
                return res.json(responseJson(false, err))
            }
            const password = req.body.password
            var isValidPass = await bcrypt.compare(password ? password : '', account.password)

            if (!isValidPass) {
                const err = { password: { message: 'Password is not correct!' } }
                return res.json(responseJson(false, err))
            }

            const data = {
                fullname: account.fullname,
                avatar: account.avatar,
                accessToken: encodedToken(account._id),
                expiresIn: new Date().setDate(new Date().getDate() + 1)
            }
            
            return res.json(responseJson(true, data))
        }
        catch (err) {
            console.log(err)
            return res.json(responseJson(false, err.errors))
        }
    }

    async getAll(req, res, next) {
        try {
            const accounts = await Account.find().select('fullname username avatar role')
            return res.json(responseJson(true, accounts))
        }
        catch(err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    myAccount(req, res, next) {
        const { account } = res.data
        return res.json(responseJson(true, account))
    }

    async getById(req, res, next) {
        try {
            const account = await Account.findOne({
                 _id: req.params.accountId 
                }).select('-password')
            if(!account) {
                const err = { account: { message: 'Account does not exist!' } }
                return res.json(responseJson(false, err))
            }   

            return res.json(responseJson(true, account))
        }
        catch(err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async update(req, res, next) {
        try {
            if(!req.body._id) {
                const err = { id: { message: 'AccountId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const account = await Account.findOne({ _id: req.body._id })
            if(!account) {
                const err = { account: { message: 'Account does not exist!' } }
                return res.json(responseJson(false, err))
            }

            await Account.updateOne({ _id: req.body._id }, req.body)

            return res.json(responseJson(true, req.body))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async changePass(req, res, next) {
        try {
            const account = res.data.account

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

            await Account.updateOne({ _id: account._id }, { password: hashPass })

            return res.json(responseJson(true))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new AccountController