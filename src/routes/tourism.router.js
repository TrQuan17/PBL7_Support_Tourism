const express = require('express')
const router = express.Router()

const tourismController = require('../app/controllers/tourism.controller')
const resortController = require('../app/controllers/resort.controller')
const reviewController = require('../app/controllers/review.controller')

const { verifyAccount, verifyManagerRole } = require('../app/middlewares/authorization.middleware')

router.get('/:tourismId/resorts', resortController.getResortsByTourismId)
router.get('/:tourismId/reviews', reviewController.getByTourismId)
router.get('/:tourismId', tourismController.getById)
router.get('/', tourismController.getAll)
router.post('/', verifyAccount, verifyManagerRole, tourismController.create)
router.put('/', verifyAccount, verifyManagerRole, tourismController.update)
router.delete('/', verifyAccount, verifyManagerRole, tourismController.delete)

module.exports = router