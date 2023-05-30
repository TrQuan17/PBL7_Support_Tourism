const express = require('express')
const router = express.Router()

const serviceController = require('../app/controllers/service.controller')

const { verifyAccount, verifyManagerRole } = require('../app/middlewares/authorization.middleware')

router.post('/', verifyAccount, verifyManagerRole, serviceController.create)
router.put('/', verifyAccount, verifyManagerRole, serviceController.update)
router.delete('/', verifyAccount, verifyManagerRole, serviceController.delete)

module.exports = router