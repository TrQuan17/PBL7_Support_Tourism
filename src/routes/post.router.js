const express = require('express')
const router = express.Router()

const postController = require('../app/controllers/post.controller')
const { verifyAccount } = require('../app/middlewares/authorization.middleware')
const uploadCloud = require('../app/middlewares/upload.middleware')

router.post('/', verifyAccount, uploadCloud.array('images'), postController.create)
router.delete('/', verifyAccount, postController.delete)

module.exports = router