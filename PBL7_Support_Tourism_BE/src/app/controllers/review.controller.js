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

            const pageNumber = req.query.page ? req.query.page : 1
            const offset = (pageNumber - 1) * process.env.PAGE_SIZE

            const reviews = await Review.find({ tourism: req.params.tourismId })
                .populate({ path: 'account', select: 'fullname avatar createdAt' })
                .skip(offset)
                .limit(process.env.PAGE_SIZE)

            return res.json(responseJson(true, reviews))
        }
        catch (err) {
            console.log(err)
            return res.json(responseJson(false, err.errors))
        }
    }

    async getRateNumByTourismId(req, res, next) {
        try {
            if (!req.params.tourismId) {
                const err = { tourismId: { message: 'TourismId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const reviews = await Review.find({ tourism: req.params.tourismId })
                .select('vote')

            const excellent = reviews.filter(review => review.vote === 5).length
            const veryGood = reviews.filter(review => review.vote === 4).length
            const average = reviews.filter(review => review.vote === 3).length
            const unsatisfactory = reviews.filter(review => review.vote === 2).length
            const terrible = reviews.filter(review => review.vote === 1).length

            const data = {
                excellent,
                veryGood,
                average,
                unsatisfactory,
                terrible
            }

            return res.json(responseJson(true, data))
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

            const pageNumber = req.query.page ? req.query.page : 1
            const offset = (pageNumber - 1) * process.env.PAGE_SIZE

            const reviews = await Review.find({ resort: req.params.resortId })
                .populate({ path: 'account', select: 'fullname avatar createdAt' })
                .skip(offset)
                .limit(process.env.PAGE_SIZE)

            return res.json(responseJson(true, reviews))
        }
        catch (err) {
            console.log(err)
            return res.json(responseJson(false, err.errors))
        }
    }

    async getRateNumByResortId(req, res, next) {
        try {
            if (!req.params.resortId) {
                const err = { resortId: { message: 'ResortId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const reviews = await Review.find({ resort: req.params.resortId })
                .select('vote')

            const excellent = reviews.filter(review => review.vote === 5).length
            const veryGood = reviews.filter(review => review.vote === 4).length
            const average = reviews.filter(review => review.vote === 3).length
            const unsatisfactory = reviews.filter(review => review.vote === 2).length
            const terrible = reviews.filter(review => review.vote === 1).length

            const data = {
                excellent,
                veryGood,
                average,
                unsatisfactory,
                terrible
            }

            return res.json(responseJson(true, data))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async checkAcountReview(req, res, next) {
        try {
            if (req.params.tourismId) {
                const reviewWithTourism = await Review.findOne({
                    account: res.data.account._id,
                    tourism: req.params.tourismId
                })

                if (reviewWithTourism) {
                    const err = { review: { message: 'Review with tourism already exist!' } }
                    return res.json(responseJson(false, err))
                }
            }

            if (req.params.resortId) {
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
        catch (err) {
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

            await newReview.save()

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

    async updateRateTourism(req, res, next) {
        try {
            const tourism = await Tourism.findOne({ _id: req.params.tourismId })
            if(!tourism) {
                const err = { tourism: { message: 'Tourism does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const reviews = await Review.find({ tourism: req.params.tourismId })
                .select('vote')

            const total = reviews.reduce((total, value) => total + value.vote, 0)
            
            const avg = total / reviews.length

            await Tourism.updateOne({ _id: req.params.tourismId }, {
                votesNum: reviews.length,
                rate: avg
            })

            return res.json(responseJson(true))
        }
        catch(err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async updateRateResort(req, res, next) {
        try {
            const resort = await Resort.findOne({ _id: req.params.resortId })
            if(!resort) {
                const err = { resort: { message: 'Resort does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const reviews = await Review.find({ resort: req.params.resortId })
                .select('vote')

            const total = reviews.reduce((total, value) => total + value.vote, 0)
            
            const avg = total / reviews.length

            await Resort.updateOne({ _id: req.params.resortId }, {
                votesNum: reviews.length,
                rate: avg
            })

            return res.json(responseJson(true))
        }
        catch(err) {
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new ReviewController