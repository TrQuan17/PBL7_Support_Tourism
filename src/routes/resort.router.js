const express = require('express')
const router = express.Router()

const resortController = require('../app/controllers/resort.controller')
const reviewController = require('../app/controllers/review.controller')

const { verifyAccount, verifyManagerRole } = require('../app/middlewares/authorization.middleware')

router.get('/:resortId/reviews', reviewController.getByResortId)
router.post('/', verifyAccount, verifyManagerRole, resortController.create)
router.put('/', verifyAccount, verifyManagerRole, resortController.update)
router.delete('/', verifyAccount, verifyManagerRole, resortController.delete)

module.exports = router


