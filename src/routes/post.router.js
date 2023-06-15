const express = require('express')
const router = express.Router()

const postController = require('../app/controllers/post.controller')
const { verifyAccount } = require('../app/middlewares/authorization.middleware')

router.post('/', verifyAccount, postController.create)
router.delete('/', verifyAccount, postController.delete)

module.exports = router