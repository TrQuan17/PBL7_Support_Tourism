const Category = require('../models/category.model')
const { responseJson } = require('../../config/response')

class CategoryController {
    async getAll(req, res, next) {
        try {
            var categories = await Category.find({})
            return res.json(responseJson(true, categories))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async create(req, res, next) {
        try {
            var newCategory = new Category(req.body)
            await newCategory.save()

            return res.json(responseJson(true, newCategory))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.body._id) {
                const err = { 'id': { message: 'CategoryId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var category = await Category.findOne({ _id: req.body._id }, req.body)
            if (!category) {
                const err = { 'category': { message: 'Category does not exist!' } }
                return res.json(response(false, err))
            }

            await Category.updateOne({ _id: req.body._id }, req.body)

            return res.json(responseJson(true, req.body))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.body._id) {
                const err = { 'id': { message: 'CategoryId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var category = await Category.findOneAndDelete({ _id: req.body._id })
            if (!category) {
                const err = { 'category': { message: 'Category does not exist!' } }
                return res.json(responseJson(false, err))
            }

            return res.json(responseJson(true, category))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new CategoryController