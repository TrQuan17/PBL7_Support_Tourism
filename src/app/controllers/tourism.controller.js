const Tourism = require('../models/tourism.model')
const Category = require('../models/category.model')

class TourismController {
    async getAll(req, res, next) {
        try {
            const tourisms = await Tourism.find({})

            return res.json(tourisms)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }

    async getByCategoryId(req, res, next) {
        try {
            if(!req.params.categoryId) {
                return res.json({ 'categoryId': { message: 'CategoryId does not exist!' } })
            }

            const tourisms = await Tourism.find({ category: req.params.categoryId })

            return res.json(tourisms)
        }
        catch(err) {
            return res.json({ err: err.errors })
        }
    }

    async create(req, res, next) {
        try {
            var newTourism = new Tourism(req.body)

            var category = await Category.findOne({ _id: req.body.categoty })
            if(!catogory) { return res.json({ 'category': { message: 'Caregory does not exist!' } }) }
            
            await newTourism.save()

            return res.json(newTourism)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }

    async update(req, res, next) {
        try {
            if (!req.body.id) { return res.json({ 'id': { message: 'TourismId does not exist!' } }) }

            var tourism = await Tourism.findOne({ _id: req.body.id })
            if (!tourism) { return res.json({ 'tourism': { message: 'Tourism does not exist!' } }) }

            await Tourism.updateOne({ _id: req.body.id }, req.body)

            return res.json(req.body)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.body.id) { return res.json({ 'id': { message: 'TourismId does not exist!' } }) }

            var tourism = await Tourism.findOneAndDelete({ _id: req.body.id })
            if (!tourism) { return res.json({ 'Tourism': { message: 'Tourism does not exist!' } }) }

            return res.json(tourism)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }
}

module.exports = new TourismController