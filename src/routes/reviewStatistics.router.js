const express = require('express')
const router = express.Router()

const reviewStatisticsController = require('../app/controllers/reviewStatistics.controller')

router.get('/:type/recommend', reviewStatisticsController.getTopType)
router.get('/:type/:typeId', reviewStatisticsController.avgPositivePercentType)

module.exports = router