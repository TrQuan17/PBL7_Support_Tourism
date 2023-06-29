const express = require('express')
const router = express.Router()

const resortController = require('../app/controllers/resort.controller')
const serviceController = require('../app/controllers/service.controller')
const reviewController = require('../app/controllers/review.controller')

const { verifyAccount, verifyManagerRole } = require('../app/middlewares/authorization.middleware')

router.get('/:resortId/reviews', reviewController.getByResortId)
router.get('/:resortId/services', serviceController.getByResortId)
router.get('/:resortId', resortController.getById)
router.get('/', resortController.getAll)
router.post('/', verifyAccount, verifyManagerRole, resortController.create)
router.put('/', verifyAccount, verifyManagerRole, resortController.update)
router.delete('/', verifyAccount, verifyManagerRole, resortController.delete)

module.exports = router


