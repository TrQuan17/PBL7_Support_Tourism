const cloudinary = require('cloudinary').v2

const Category = require('../models/category.model')
const Tourism = require('../models/tourism.model')
const { responseJson } = require('../../config/response')

class CategoryController {
    async getAll(req, res, next) {
        try {
            const pageNumber = req.query.page ? req.query.page : 1
            const pageSize = req.query.size ? req.query.size : 0
            const offset = (pageNumber - 1) * pageSize

            const categories = await Category.find({
                name: { $regex: req.query.q, $options: 'i' }
            })
                .skip(offset)
                .limit(pageSize)

            return res.json(responseJson(true, categories))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async create(req, res, next) {
        try {
            const newCategory = new Category(req.body)

            var image = req.file
            newCategory.background = image ? image.path : ''

            await newCategory.save()

            return res.json(responseJson(true, newCategory))
        }
        catch (err) {
            if (image) {
                cloudinary.uploader.destroy(image.filename)
            }
            return res.json(responseJson(false, err.errors))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.body._id) {
                const err = { 'id': { message: 'CategoryId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const category = await Category.findOne({ _id: req.body._id }, req.body)
            if (!category) {
                const err = { 'category': { message: 'Category does not exist!' } }
                return res.json(response(false, err))
            }

            var image = req.file
            if (image) {
                req.body.background = image.path
            }

            await Category.updateOne({ _id: req.body._id }, req.body)

            return res.json(responseJson(true, req.body))
        }
        catch (err) {
            if (image) {
                cloudinary.uploader.destroy(image.filename)
            }
            return res.json(responseJson(false, err.errors))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.body._id) {
                const err = { 'id': { message: 'CategoryId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const tourisms = await Tourism.find({ category: req.body._id })
            if (tourisms) {
                const err = { tourism: { message: 'Category containing tourism!' } }
                return res.json(responseJson(false, err))
            }

            const category = await Category.findOneAndDelete({ _id: req.body._id })
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