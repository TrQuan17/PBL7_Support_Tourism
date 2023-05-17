const express = require('express')
const router = express.Router()

const tourismController = require('../app/controllers/tourism.controller')

router.get('/', tourismController.getAll)
router.post('/', tourismController.create)
router.put('/', tourismController.update)
router.delete('/', tourismController.delete)

module.exports = router