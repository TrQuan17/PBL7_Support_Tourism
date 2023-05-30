const express = require('express')
const router = express.Router()

const accountController = require('../app/controllers/account.controller')
const favouriteController = require('../app/controllers/favourite.controller')

const { verifyAccount } = require('../app/middlewares/authorization.middleware')

router.get('/:accountId/favourites', verifyAccount, favouriteController.getByAccountId)
router.post('/register', accountController.register)
router.post('/login', accountController.login)
router.patch('/update/info', verifyAccount, accountController.update)
router.patch('/update/password', verifyAccount, accountController.changePass)

module.exports = router