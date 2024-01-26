const express = require('express')
const router = express.Router()

const favouriteController = require('../app/controllers/favourite.controller')

const { verifyAccount } = require('../app/middlewares/authorization.middleware')

router.post('/', verifyAccount, favouriteController.create)
router.delete('/', verifyAccount,  favouriteController.delete)

module.exports = router