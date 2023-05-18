const express = require('express')
const router = express.Router()

const favouriteController = require('../app/controllers/favourite.controller')

router.post('/', favouriteController.create)
router.delete('/', favouriteController.delete)

module.exports = router