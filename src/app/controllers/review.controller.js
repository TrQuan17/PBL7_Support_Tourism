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
                .populate({ path: 'account', select: 'fullname avatar createdAt'})

            return res.json(responseJson(true, reviews))
        }
        catch (err) {
            console.log(err)
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
                .populate({ auth: 'account' , select: 'fullname avatar createdAt'})

            return res.json(responseJson(true, reviews))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async createWithTourism(req, res, next) {
        try {
            const newReview = new Review(req.body)

            const account = await Account.findOne({ _id: req.body.account })
            if (!account) {
                const err = { account: { message: 'Account does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const tourism = await Tourism.findOne({ _id: req.body.tourism })
            if (!tourism) {
                const err = { tourism: { message: 'Tourism does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const reviewWithTourism = await Review.findOne({
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
            const newReview = new Review(req.body)

            const account = await Account.findOne({ _id: req.body.account })
            if (!account) {
                const err = { account: { message: 'Account does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const resort = await Resort.findOne({ _id: req.body.resort })
            if (!resort) {
                const err = { resort: { message: 'Resort does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const reviewWithResort = await Review.findOne({
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
            console.log(err)
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new ReviewController