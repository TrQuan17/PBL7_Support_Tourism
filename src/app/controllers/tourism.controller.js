const Tourism = require('../models/tourism.model')
const Category = require('../models/category.model')
const { responseJson } = require('../../config/response')
const CategoryModel = require('../models/category.model')

class TourismController {
    async getAll(req, res, next) {
        try {
            const tourisms = await Tourism.find({})

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

    async create(req, res, next) {
        try {
            var newTourism = new Tourism(req.body)

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
            if (!req.body.id) { 
                const err = { id: { message: 'TourismId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const tourism = await Tourism.findOne({ _id: req.body.id })
            if (!tourism) { 
                const err = { tourism: { message: 'Tourism does not exist!' } }
                return res.json(responseJson(false, err))
            }

            if(req.body.categoryId) {               
                const category = await Category.findOne({ _id: req.body.categoryId })
                if(!category) {
                    const err = { category: { message: 'Category does not exist!' } }
                    return res.json(responseJson(false, err))
                }
            }

            await Tourism.updateOne({ _id: req.body.id }, req.body)

            return res.json(responseJson(true, req.body))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.body.id) { 
                const err = { 'id': { message: 'TourismId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var tourism = await Tourism.findOneAndDelete({ _id: req.body.id })
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