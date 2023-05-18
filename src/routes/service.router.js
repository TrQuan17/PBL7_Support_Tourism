const express = require('express')
const router = express.Router()

const serviceController = require('../app/controllers/service.controller')

router.post('/', serviceController.create)
router.put('/', serviceController.update)
router.delete('/', serviceController.delete)

module.exports = router