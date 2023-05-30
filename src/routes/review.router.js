const express = require('express')
const router = express.Router()

const reviewController = require('../app/controllers/review.controller')

const { verifyAccount } = require('../app/middlewares/authorization.middleware')

router.post('/write/tourism', verifyAccount, reviewController.createWithTourism)
router.post('/write/resort', verifyAccount, reviewController.createWithResort)

module.exports = router