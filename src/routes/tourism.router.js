const express = require('express')
const router = express.Router()

const tourismController = require('../app/controllers/tourism.controller')
const resortController = require('../app/controllers/resort.controller')
const reviewController = require('../app/controllers/review.controller')

router.get('/:tourismId/resorts', resortController.getResortsByTourismId)
router.get('/:tourismId/reviews', reviewController.getByTourismId)
router.get('/', tourismController.getAll)
router.post('/', tourismController.create)
router.put('/', tourismController.update)
router.delete('/', tourismController.delete)

module.exports = router