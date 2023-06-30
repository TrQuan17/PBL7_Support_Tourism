const express = require('express')
const router = express.Router()


const reviewController = require('../app/controllers/review.controller')

const { verifyAccount } = require('../app/middlewares/authorization.middleware')
const uploadCloud = require('../app/middlewares/upload.middleware')

router.get('/tourism/:tourismId/check', verifyAccount, reviewController.checkAcountReview)
router.get('/resort/:resortId/check', verifyAccount, reviewController.checkAcountReview)
router.post('/write/tourism', verifyAccount, uploadCloud.array('images'), reviewController.createWithTourism)
router.post('/write/resort', verifyAccount, uploadCloud.array('images'), reviewController.createWithResort)

module.exports = router