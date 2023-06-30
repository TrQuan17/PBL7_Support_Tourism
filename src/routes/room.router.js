const express = require('express')
const router = express.Router()

const roomController = require('../app/controllers/room.controller')
const { verifyAccount, verifyResortManagerRole } = require('../app/middlewares/authorization.middleware')
const uploadCloud = require('../app/middlewares/upload.middleware')

router.post('/', verifyAccount, verifyResortManagerRole, uploadCloud.single('image'), roomController.create)
router.delete('/', verifyAccount, verifyResortManagerRole, uploadCloud.single('image'), roomController.delete)

module.exports = router