const Tourism = require('../models/tourism.model')
const Category = require('../models/category.model')
const { responseJson } = require('../../config/response')
const CategoryModel = require('../models/category.model')

class TourismController {
    async getAll(req, res, next) {
        try {
            const tourisms = await Tourism.find({
                name: { $regex: req.query.q, $options: 'i' }
            })

            return res.json(responseJson(true, tourisms))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async getByCategoryId(req, res, next) {
        try {
            if(!req.params.categoryId) {
                const err = { categoryId: { message: 'CategoryId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const tourisms = await Tourism.find({ category: req.params.categoryId })

            return res.json(responseJson(true, tourisms))
        }
        catch(err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async getByAccountId(req, res, next) {
        try {
            const accountId = res.data.account._id

            const tourisms = await Tourism.find({ account: accountId })
            
            return res.json(responseJson(true, tourisms))
        }
        catch(err) {
            console.log(err)
            return res.json(responseJson(false, err.errors))
        }
    }

    async getById(req, res, next) {
        try {
            if(!req.params.tourismId) {
                const err = { tourismId: { message: 'TourismId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const tourism = await Tourism.findOne({ _id: req.params.tourismId })

            return res.json(responseJson(true, tourism))
        }
        catch(err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async create(req, res, next) {
        try {
            const newTourism = new Tourism(req.body)

            newTourism.account = res.data.account._id

            var category = await Category.findOne({ _id: req.body.category })
            if(!category) { 
                const err = { category: { message: 'Category does not exist!' } }
                return res.json(responseJson(false, err))
            }
            
            await newTourism.save()

            return res.json(responseJson(true, newTourism))
        }
        catch (err) {
            console.log(err)
            return res.json(responseJson(false, err.errors))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.body._id) { 
                const err = { id: { message: 'TourismId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const tourism = await Tourism.findOne({ _id: req.body._id })
            if (!tourism) { 
                const err = { tourism: { message: 'Tourism does not exist!' } }
                return res.json(responseJson(false, err))
            }

            if(req.body.category) {               
                const category = await Category.findOne({ _id: req.body.category })
                if(!category) {
                    const err = { category: { message: 'Category does not exist!' } }
                    return res.json(responseJson(false, err))
                }
            }

            await Tourism.updateOne({ _id: req.body._id }, req.body)

            return res.json(responseJson(true, req.body))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.body._id) { 
                const err = { 'id': { message: 'TourismId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var tourism = await Tourism.findOneAndDelete({ _id: req.body._id })
            if (!tourism) { 
                const err = { 'Tourism': { message: 'Tourism does not exist!' } }
                return res.json(responseJson(false, err))
            }

            return res.json(responseJson(true, tourism))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new TourismController