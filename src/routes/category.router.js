const express = require('express')
const router = express.Router()

const categoryController = require('../app/controllers/category.controller')
const tourismController = require('../app/controllers/tourism.controller')

router.get('/:categoryId/tourisms', tourismController.getByCategoryId)
router.get('/', categoryController.getAll)
router.post('/', categoryController.create)
router.put('/', categoryController.update)
router.delete('/', categoryController.delete)

module.exports = router