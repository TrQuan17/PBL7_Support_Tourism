const Resort = require('../models/resort.model')
const Tourism = require('../models/tourism.model')

class ResortController {
    async getResortsByTourismId(req, res, next) {
        try {
            var resorts = await Resort.find({ tourism: req.body.tourismId })
            return res.json(resorts)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }

    async create(req, res, next) {
        try {
            var newResort = new Resort(req.body)

            var tourism = await Tourism.findOne({ _id: req.body.tourism })
            if (!tourism) { return res.json({ 'tourism': { message: 'Tourism does not exist!' } }) }
            
            await newResort.save()
            
            return res.json(newResort)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }

    async update(req, res, next) {
        try {
            if (!req.body.id) { return res.json({ 'id': { message: 'ResortId does not exist!' } }) }

            var resort = await Resort.findOne({ _id: req.body.id })
            if (!resort) { return res.json({ 'resort': { message: 'Resort does not exist!' } }) }

            await Resort.updateOne({ _id: req.body.id }, req.body)

            return res.json(req.body)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.body.id) { return res.json({ 'id': { message: 'ResortId does not exist!' } }) }

            var resort = await Resort.findOneAndDelete({ _id: req.body.id })

            if (!resort) { return res.json({ 'resort': { message: 'Resort does not exist!' } }) }

            return res.json(resort)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }
}

module.exports = new ResortController 