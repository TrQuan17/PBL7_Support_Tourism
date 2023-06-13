const express = require('express')
const router = express.Router()


const reviewController = require('../app/controllers/review.controller')

const { upload } = require('../app/middlewares/upload.middleware')
const { verifyAccount } = require('../app/middlewares/authorization.middleware')

router.post('/write/tourism', verifyAccount, upload.array('images'), reviewController.createWithTourism)
router.post('/write/resort', verifyAccount, reviewController.createWithResort)

module.exports = router