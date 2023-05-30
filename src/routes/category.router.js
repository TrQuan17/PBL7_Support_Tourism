const express = require('express')
const router = express.Router()

const categoryController = require('../app/controllers/category.controller')
const tourismController = require('../app/controllers/tourism.controller')

const { verifyAccount, verifyAdminRole } = require('../app/middlewares/authorization.middleware')

router.get('/:categoryId/tourisms', tourismController.getByCategoryId)
router.get('/', categoryController.getAll)
router.post('/', verifyAccount, verifyAdminRole, categoryController.create)
router.put('/', verifyAccount, verifyAdminRole,  categoryController.update)
router.delete('/', verifyAccount, verifyAdminRole, categoryController.delete)

module.exports = router