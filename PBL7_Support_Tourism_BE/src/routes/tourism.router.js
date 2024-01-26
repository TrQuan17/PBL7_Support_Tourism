const express = require('express')
const router = express.Router()

const tourismController = require('../app/controllers/tourism.controller')
const resortController = require('../app/controllers/resort.controller')
const reviewController = require('../app/controllers/review.controller')

const { verifyAccount, verifyTourismManagerRole } = require('../app/middlewares/authorization.middleware')
const uploadCloud = require('../app/middlewares/upload.middleware')

router.get('/:tourismId/resorts', resortController.getByTourismId)
router.get('/:tourismId/reviews', reviewController.getByTourismId)
router.get('/:tourismId/rate/num', reviewController.getRateNumByTourismId)
router.get('/:tourismId', tourismController.getById)
router.get('/', tourismController.getAll)
router.post('/', verifyAccount, verifyTourismManagerRole, uploadCloud.array('imagesUpload'), tourismController.create)
router.put('/', verifyAccount, verifyTourismManagerRole, uploadCloud.array('imagesUpload'), tourismController.update)
router.delete('/', verifyAccount, verifyTourismManagerRole, tourismController.delete)

module.exports = router