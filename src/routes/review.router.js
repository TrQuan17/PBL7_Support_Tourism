const express = require('express')
const router = express.Router()

const reviewController = require('../app/controllers/review.controller')

router.post('/write/tourism', reviewController.createWithTourism)
router.post('/write/resort', reviewController.createWithResort)

module.exports = router