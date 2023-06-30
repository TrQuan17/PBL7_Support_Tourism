const express = require('express')
const router = express.Router()

const serviceController = require('../app/controllers/service.controller')

const { verifyAccount, verifyResortManagerRole } = require('../app/middlewares/authorization.middleware')
const uploadCloud = require('../app/middlewares/upload.middleware')

router.post('/', verifyAccount, verifyResortManagerRole, uploadCloud.single('imageUpload'), serviceController.create)
router.put('/', verifyAccount, verifyResortManagerRole, uploadCloud.single('imageUpload'), serviceController.update)
router.delete('/', verifyAccount, verifyResortManagerRole, serviceController.delete)

module.exports = router