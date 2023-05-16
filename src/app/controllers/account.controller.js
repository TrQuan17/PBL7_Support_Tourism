const bcrypt = require('bcrypt')

const Account = require('../models/account.model')

class AccountController {
    async register(req, res, next) {
        try {
            // Password encrytion
            const salt = await bcrypt.genSalt(10)
            const hashPass = await bcrypt.hash(req.body.password, salt)

            req.body.password = hashPass

            const account = new Account(req.body)

            await account.save()
            res.json(account)
        }
        catch (err) {
            res.json({ err: err.errors })
        }
    }

    async login(req, res, next) {
        try {
            var account = await Account.findOne({
                username: req.body?.username
            })

            if (!account) {
                return res.json({
                    'username': { message: 'Username does not exist!' }
                })
            }

            var password = req.body.password
            var isValidPass = await bcrypt.compare(password ? password : '', account.password)

            if(!isValidPass) {
                return res.json({
                    'password': { message: 'Password is not correct!' }
                })
            }

            res.json(account)
        }
        catch (err) {
            res.json({ err: err.errors })
        }
    }
}

module.exports = new AccountController