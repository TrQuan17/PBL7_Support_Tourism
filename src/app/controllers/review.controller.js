const Review = require('../models/review.model')
const Tourism = require('../models/tourism.model')
const Resort = require('../models/resort.model')
const Account = require('../models/account.model')

const { responseJson } = require('../../config/response')

class ReviewController {
    async getByTourismId(req, res, next) {
        try {
            if (!req.params.tourismId) {
                const err = { tourismId: { message: 'TourismId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const reviews = await Review.find({ tourism: req.params.tourismId })

            return res.json(responseJson(true, reviews))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async getByResortId(req, res, next) {
        try {
            if (!req.params.resortId) {
                const err = { resortId: { message: 'ResortId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const reviews = await Review.find({ resort: req.params.resortId })

            return res.json(responseJson(true, reviews))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async createWithTourism(req, res, next) {
        try {
            var newReview = new Review(req.body)

            var account = Account.findOne({ _id: req.body.account })
            if (!account) {
                const err = { account: { message: 'Account does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var tourism = Account.findOne({ _id: req.body.tourism })
            if (!tourism) {
                const err = { tourism: { message: 'Tourism does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var reviewWithTourism = Review.findOne({
                account: req.body.account,
                tourism: req.body.tourism
            })

            if(reviewWithTourism) {
                const err = { review: { message: 'Review with tourism already exist!' } }
                return res.json(responseJson(false, err))
            }

            await newReview.save()
            return res.json(responseJson(true, newReview))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async createWithResort(req, res, next) {
        try {
            var newReview = new Review(req.body)

            var account = Account.findOne({ _id: req.body.account })
            if (!account) {
                const err = { account: { message: 'Account does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var resort = Account.findOne({ _id: req.body.resort })
            if (!resort) {
                const err = { resort: { message: 'Resort does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var reviewWithResort = Review.findOne({
                account: req.body.account,
                resort: req.body.resort
            })

            if(reviewWithResort) {
                const err = { review: { message: 'Review with resort already exist!' } }
                return res.json(responseJson(false, err))
            }

            await newReview.save()
            return res.json(responseJson(true, newReview))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new ReviewController