const express = require('express')
const router = express.Router()

const roomController = require('../app/controllers/room.controller')
const { verifyAccount, verifyResortManagerRole } = require('../app/middlewares/authorization.middleware')
const uploadCloud = require('../app/middlewares/upload.middleware')

router.post('/', verifyAccount, verifyResortManagerRole, uploadCloud.single('imageUpload'), roomController.create)
router.put('/', verifyAccount, verifyResortManagerRole, uploadCloud.single('imageUpload'), roomController.update)
router.delete('/', verifyAccount, verifyResortManagerRole, roomController.delete)

module.exports = router