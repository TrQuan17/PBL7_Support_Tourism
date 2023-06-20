const Resort = require('../models/resort.model')
const Tourism = require('../models/tourism.model')

const { responseJson } = require('../../config/response')

class ResortController {
    async getAll(req, res, next) {
        try {
            const resorts = await Resort.find({
                name: { $regex: req.query.q, $options: 'i' }
            })
            
            return res.json(responseJson(true, resorts))
        }
        catch(err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async getResortsByTourismId(req, res, next) {
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
            const accountId = res.data.account._id

            const resorts = await Resort.find({ account: accountId })
                .populate({ path: 'tourism', select: 'name' })

            return res.json(responseJson(true, resorts))
        }
        catch(err) {
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

            await newResort.save()

            return res.json(responseJson(true, newResort))
        }
        catch (err) {
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

            await Resort.updateOne({ _id: req.body._id }, req.body)

            return res.json(responseJson(true, req.body))
        }
        catch (err) {
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

            return res.json(responseJson(true, resort))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new ResortController 