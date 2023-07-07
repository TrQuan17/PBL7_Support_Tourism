const express = require('express')
const router = express.Router()

const resortController = require('../app/controllers/resort.controller')
const serviceController = require('../app/controllers/service.controller')
const reviewController = require('../app/controllers/review.controller')
const roomController = require('../app/controllers/room.controller')

const { verifyAccount, verifyResortManagerRole } = require('../app/middlewares/authorization.middleware')
const uploadCloud = require('../app/middlewares/upload.middleware')

router.get('/:resortId/reviews', reviewController.getByResortId)
router.get('/:resortId/rate/num', reviewController.getRateNumByResortId)
router.get('/:resortId/services', serviceController.getByResortId)
router.get('/:resortId/rooms', roomController.getByResortId)
router.get('/:resortId', resortController.getById)
router.get('/', resortController.getAll)
router.post('/', verifyAccount, verifyResortManagerRole, uploadCloud.array('imagesUpload'), resortController.create)
router.put('/', verifyAccount, verifyResortManagerRole,  uploadCloud.array('imagesUpload'), resortController.update)
router.delete('/', verifyAccount, verifyResortManagerRole, resortController.delete)

module.exports = router
