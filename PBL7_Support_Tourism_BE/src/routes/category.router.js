const express = require('express')
const router = express.Router()

const categoryController = require('../app/controllers/category.controller')
const tourismController = require('../app/controllers/tourism.controller')

const { verifyAccount, verifyAdminRole } = require('../app/middlewares/authorization.middleware')
const uploadCloud = require('../app/middlewares/upload.middleware')

router.get('/:categoryId/tourisms', tourismController.getByCategoryId)
router.get('/', categoryController.getAll)
router.post('/', verifyAccount, verifyAdminRole, uploadCloud.single('background'), categoryController.create)
router.put('/', verifyAccount, verifyAdminRole, uploadCloud.single('background'), categoryController.update)
router.delete('/', verifyAccount, verifyAdminRole, uploadCloud.single(), categoryController.delete)

module.exports = router