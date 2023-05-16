const {
    mongooseToObj,
    multiMongooseToObj
} = require('../../utils/mongoose.util')
const Category = require('../models/category.model')

class CategoryController {
    async getAll(req, res, next) {
        try {
            var categories = await Category.find({})
            res.json(categories)
        }
        catch (err) {
            res.json({ err: err.errors })
        }
    }

    async create(req, res, next) {
        try {
            var category = new Category(req.body)
            await category.save()

            res.json(category)
        }
        catch (err) {
            res.json({ err: err.errors })
        }
    }

    async update(req, res, next) {
        try {
            if (!req.body.id) { return res.json({ 'id': { message: 'CategoryId does not exist!' } }) }

            var category = await Category.findOneAndUpdate({_id: req.body?.id}, req.body)

            if(!category) { return res.json({ 'category': { message: 'Category does not exist!' } }) }

            res.json(category)
        }
        catch (err) {
            res.json({ err: err.errors })
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.body.id) { return res.json({ 'id': { message: 'CategoryId does not exist!' } }) }
            
            var category = await Category.findOneAndDelete({ _id: req.body.id })

            if(!category) { return res.json({ 'category': { message: 'Category does not exist!' } }) }

            res.json(category)
        }
        catch(err) {
            res.json(category)
        }
    }
}

module.exports = new CategoryController