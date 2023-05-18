const express = require('express')
const router = express.Router()

const accountController = require('../app/controllers/account.controller')
const favouriteController = require('../app/controllers/favourite.controller')

router.get('/:accountId/favourites', favouriteController.getByAccountId)
router.post('/register', accountController.register)
router.post('/login', accountController.login)
router.patch('/update/info', accountController.update)
router.patch('/update/password', accountController.changePass)

module.exports = router