const cloudinary = require('cloudinary').v2

const Resort = require('../models/resort.model')
const Service = require('../models/service.model')
const Room = require('../models/room.model')
const Tourism = require('../models/tourism.model')

const { responseJson } = require('../../config/response')

class ResortController {
    async getAll(req, res, next) {
        try {
            const pageNumber = req.query.page ? req.query.page : 1
            const offset = (pageNumber - 1) * process.env.PAGE_SIZE

            const size = req.query.size || req.query.size === 0 ? req.query.size : process.env.PAGE_SIZE

            const resorts = await Resort.find().or([
                { name: { $regex: req.query.q, $options: 'i' } },
                { address: { $regex: req.query.q, $options: 'i' } }
            ])
                .populate({ path: 'tourism', select: 'name' })
                .skip(offset)
                .limit(size)

            return res.json(responseJson(true, resorts))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async getById(req, res, next) {
        try {
            if (!req.params.resortId) {
                const err = { resortId: { message: 'ResortId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const resort = await Resort.findOne({ _id: req.params.resortId })
            if (!resort) {
                const err = { resort: { message: 'Resort does not exist!' } }
                return res.json(responseJson(false, err))
            }

            return res.json(responseJson(true, resort))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async getByTourismId(req, res, next) {
        try {
            if (!req.params.tourismId) {
                const err = { tourismId: { message: 'TourismId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const resorts = await Resort.find({ tourism: req.params.tourismId })
            return res.json(responseJson(true, resorts))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async getByAccountId(req, res, next) {
        try {
            const pageNumber = req.query.page ? req.query.page : 1
            const offset = (pageNumber - 1) * process.env.PAGE_SIZE

            const accountId = res.data.account._id

            const resorts = await Resort.find({
                account: accountId,
                name: { $regex: req.query.q, $options: 'i' }
            })
                .populate({ path: 'tourism', select: 'name' })
                .skip(offset)
                .limit(process.env.PAGE_SIZE)

            return res.json(responseJson(true, resorts))
        }
        catch (err) {
            console.log(err)
            return res.json(responseJson(false, err.errors))
        }
    }

    async create(req, res, next) {
        try {
            const newResort = new Resort(req.body)

            newResort.account = res.data.account._id

            const tourism = await Tourism.findOne({ _id: req.body.tourism })
            if (!tourism) {
                const err = { tourism: { message: 'Tourism does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var images = req.files
            if (images) {
                const urlArr = images.map(value => value.path)
                newResort.images = urlArr
            }

            await newResort.save()

            return res.json(responseJson(true, newResort))
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

    async update(req, res, next) {
        try {
            if (!req.body._id) {
                const err = { id: { message: 'ResortId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const resort = await Resort.findOne({ _id: req.body._id })
            if (!resort) {
                const err = { resort: { message: 'Resort does not exist!' } }
                return res.json(responseJson(false, err))
            }

            req.body.images = req.body.images ? req.body.images : []

            var images = req.files
            if (images) {
                const urlArr = images.map(value => value.path)

                if (typeof req.body.images === 'object') {
                    req.body.images.push(...urlArr)
                }

                if (typeof req.body.images === 'string') {
                    req.body.images = [req.body.images, ...urlArr]
                }
            }

            await Resort.updateOne({ _id: req.body._id }, req.body)

            return res.json(responseJson(true, req.body))
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

    async delete(req, res, next) {
        try {
            if (!req.body._id) {
                const err = { id: { message: 'ResortId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const resort = await Resort.findOneAndDelete({ _id: req.body._id })
            if (!resort) {
                const err = { resort: { message: 'Resort does not exist!' } }
                return res.json(responseJson(false, err))
            }

            await Service.deleteMany({ resort: req.body._id })
            await Room.deleteMany({ resort: req.body._id })

            return res.json(responseJson(true))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new ResortController 