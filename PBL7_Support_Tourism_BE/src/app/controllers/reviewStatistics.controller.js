const { json } = require('express')
const { responseJson } = require('../../config/response')
const ReviewStatistics = require('../models/reviewStatistics.model')
const Tourism = require('../models/tourism.model')
const Resort = require('../models/resort.model')
const Review = require('../models/review.model')

class ReviewStatisticsController {
    async getTopType(req, res, next) {
        try {
            const topList = await ReviewStatistics.find({ type: req.params.type })
                .populate({ path: 'typeRef', select: 'name images rate votesNum' })
                .sort({ 'positivePercent': 'desc' })
                .skip(0)
                .limit(process.env.PAGE_SIZE)

            return res.json(responseJson(true, topList))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async avgPositivePercentType(req, res, next) {
        try {
            let reviews = []

            if (req.params.type === 'tourisms') {
                const tourism = await Tourism.findOne({ _id: req.params.typeId })
                if (!tourism) {
                    const err = { tourism: { message: 'Tourism does not exist!' } }
                    return res.json(responseJson(false, err))
                }


                reviews = await Review.find({ tourism: req.params.typeId })
                    .select('reliability')
            }

            if (req.params.type === 'resorts') {
                const resort = await Resort.findOne({ _id: req.params.typeId })
                if (!resort) {
                    const err = { resort: { message: 'Resort does not exist!' } }
                    return res.json(responseJson(false, err))
                }

                reviews = await Review.find({ resort: req.params.typeId })
                    .select('reliability')
            }
            
            let avg = 0

            if (reviews.length) {
                const total = reviews.reduce((total, value) => total + parseFloat(value.reliability), 0);
                avg = total / reviews.length
            }

            const reviewStatistics = await ReviewStatistics.findOne({ typeRef: req.params.typeId })
            if (!reviewStatistics) {
                const newStatistics = new ReviewStatistics()
                newStatistics.type = req.params.type
                newStatistics.typeRef = req.params.typeId
                newStatistics.positivePercent = avg

                await newStatistics.save()
            }
            else {
                await ReviewStatistics.updateOne({ _id: reviewStatistics._id }, {
                    positivePercent: avg
                })
            }

            return res.json(responseJson(true))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new ReviewStatisticsController