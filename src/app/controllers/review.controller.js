const Review = require('../models/review.model')
const Tourism = require('../models/tourism.model')
const Resort = require('../models/resort.model')
const Account = require('../models/account.model')

class ReviewController {
    async getByTourismId(req, res, next) {
        try {
            if (!req.params.tourismId) {
                return res.json({ 'tourismId': { message: 'TourismId does not exist!' } })
            }

            var reviews = await Review.find({ tourism: req.params.tourismId })
                .populate({ path: 'tourism' })

            return res.json(reviews)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }

    async getByResortId(req, res, next) {
        try {
            if (!req.params.resortId) {
                return res.json({ 'resortId': { message: 'ResortId does not exist!' } })
            }

            var reviews = await Review.find({ resort: req.params.resortId })
                .populate({ path: 'resprt' })

            return res.json(reviews)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }

    async createWithTourism(req, res, next) {
        try {
            var newReview = new Review(req.body)

            var account = Account.findOne({ _id: req.body.account })
            if (!account) {
                return res.json({ 'account': { message: 'Account does not exist!' } })
            }

            var tourism = Account.findOne({ _id: req.body.tourism })
            if (!tourism) {
                return res.json({ 'tourism': { message: 'Tourism does not exist!' } })
            }

            var reviewWithTourism = Review.findOne({
                account: req.body.account,
                tourism: req.body.tourism
            })

            if(reviewWithTourism) {
                return res.json({ 'review': { message: 'Review with tourism already exist!' } })
            }

            await newReview.save()
            return res.json(newReview)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }

    async createWithResort(req, res, next) {
        try {
            var newReview = new Review(req.body)

            var account = Account.findOne({ _id: req.body.account })
            if (!account) {
                return res.json({ 'account': { message: 'Account does not exist!' } })
            }

            var resort = Account.findOne({ _id: req.body.resort })
            if (!resort) {
                return res.json({ 'resort': { message: 'Resort does not exist!' } })
            }

            var reviewWithResort = Review.findOne({
                account: req.body.account,
                resort: req.body.resort
            })

            if(reviewWithResort) {
                return res.json({ 'review': { message: 'Review with resort already exist!' } })
            }

            await newReview.save()
            return res.json(newReview)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }
}

module.exports = new ReviewController