const cloudinary = require('cloudinary').v2

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
                .populate({ path: 'account', select: 'fullname avatar createdAt' })

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
                .populate({ path: 'account', select: 'fullname avatar createdAt' })

            return res.json(responseJson(true, reviews))
        }
        catch (err) {
            console.log(err)
            return res.json(responseJson(false, err.errors))
        }
    }

    async checkAcountReview(req, res, next) {
        try { 
            if(req.params.tourismId) {
                const reviewWithTourism = await Review.findOne({
                    account: res.data.account._id,
                    tourism: req.params.tourismId
                })
    
                if (reviewWithTourism) {
                    const err = { review: { message: 'Review with tourism already exist!' } }
                    return res.json(responseJson(false, err))
                }
            }

            if(req.params.resortId) {
                const reviewWithResort = await Review.findOne({
                    account: res.data.account._id,
                    resort: req.params.resortId
                })
    
                if (reviewWithResort) {
                    const err = { review: { message: 'Review with resort already exist!' } }
                    return res.json(responseJson(false, err))
                }
            }

            return res.json(responseJson(true))
        }
        catch(err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async createWithTourism(req, res, next) {
        try {
            const newReview = new Review(req.body)
            newReview.account = res.data.account._id

            const tourism = await Tourism.findOne({ _id: req.body.tourism })
            if (!tourism) {
                const err = { tourism: { message: 'Tourism does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const reviewWithTourism = await Review.findOne({
                account: res.data.account._id,
                tourism: req.body.tourism
            })

            if (reviewWithTourism) {
                const err = { review: { message: 'Review with tourism already exist!' } }
                return res.json(responseJson(false, err))
            }

            var images = req.files
            if (images) {
                const urlArr = images.map(value => value.path)
                newReview.images = urlArr
            }

            await newReview.save()

            const totalVoteBefore = tourism.rate * tourism.votesNum

            const reviewsNum = await Review.countDocuments({ tourism: tourism._id })
            const avgVote = (totalVoteBefore + newReview.vote) / reviewsNum

            await Tourism.updateOne({ _id: tourism._id }, {
                votesNum: reviewsNum,
                rate: avgVote
            })

            return res.json(responseJson(true, newReview))
        }
        catch (err) {
            if (images) {
                images.forEach(element => {
                    cloudinary.uploader.destroy(element.filename)
                });
            }
            return res.json(responseJson(false, err.errors))
        }
    }

    async createWithResort(req, res, next) {
        try {
            const newReview = new Review(req.body)
            newReview.account = res.data.account._id

            const resort = await Resort.findOne({ _id: req.body.resort })
            if (!resort) {
                const err = { resort: { message: 'Resort does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const reviewWithResort = await Review.findOne({
                account: res.data.account._id,
                resort: req.body.resort
            })

            if (reviewWithResort) {
                const err = { review: { message: 'Review with resort already exist!' } }
                return res.json(responseJson(false, err))
            }

            var images = req.files
            if (images) {
                const urlArr = images.map(value => value.path)
                newReview.images = urlArr
            }

            const totalVoteBefore = resort.rate * resort.votesNum

            await newReview.save()

            const reviewsNum = await Review.countDocuments({ resort: resort._id })
            const avgVote = (totalVoteBefore + newReview.vote) / reviewsNum

            await Resort.updateOne({ _id: resort._id }, {
                votesNum: reviewsNum,
                rate: avgVote
            })

            return res.json(responseJson(true, newReview))
        }
        catch (err) {
            if (images) {
                images.forEach(element => {
                    cloudinary.uploader.destroy(element.filename)
                });
            }
            console.log(err)
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new ReviewController