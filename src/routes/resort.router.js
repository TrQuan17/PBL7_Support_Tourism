const express = require('express')
const router = express.Router()

const resortController = require('../app/controllers/resort.controller')
const reviewController = require('../app/controllers/review.controller')

router.get('/:resortId/reviews', reviewController.getByResortId)
router.post('/', resortController.create)
router.put('/', resortController.update)
router.delete('/', resortController.delete)

module.exports = router


