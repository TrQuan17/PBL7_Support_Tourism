const express = require('express')
const router = express.Router()

const tripController = require('../app/controllers/trip.controller')

const { verifyAccount } = require('../app/middlewares/authorization.middleware')
const uploadCloud = require('../app/middlewares/upload.middleware')

router.get('/:tripId', tripController.getById)
router.post('/', verifyAccount, uploadCloud.single('background'), tripController.create)
router.delete('/', verifyAccount, tripController.delete)

module.exports = router