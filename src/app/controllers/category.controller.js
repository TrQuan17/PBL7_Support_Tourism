const Category = require('../models/category.model')

class CategoryController {
    async getAll(req, res, next) {
        try {
            var categories = await Category.find({})
            return res.json(categories)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }

    async create(req, res, next) {
        try {
            var newCategory = new Category(req.body)
            await newCategory.save()

            return res.json(newCategory)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }

    async update(req, res, next) {
        try {
            if (!req.body.id) { return res.json({ 'id': { message: 'CategoryId does not exist!' } }) }

            var category = await Category.findOne({ _id: req.body.id }, req.body)
            if (!category) { return res.json({ 'category': { message: 'Category does not exist!' } }) }

            await Category.updateOne({ _id: req.body.id }, req.body)
 
            return res.json(req.body)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.body.id) { return res.json({ 'id': { message: 'CategoryId does not exist!' } }) }

            var category = await Category.findOneAndDelete({ _id: req.body.id })
            if (!category) { return res.json({ 'category': { message: 'Category does not exist!' } }) }

            return res.json(category)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }
}

module.exports = new CategoryController