const cloudinary = require('cloudinary').v2

const { responseJson } = require('../../config/response')
const Tourism = require('../models/tourism.model')
const Resort = require('../models/resort.model')
const Category = require('../models/category.model')

class TourismController {
    async getAll(req, res, next) {
        try {
            const pageNumber = req.query.page ? req.query.page : 1
            const offset = (pageNumber - 1) * process.env.PAGE_SIZE

            const size = req.query.size || req.query.size === 0 ? req.query.size : process.env.PAGE_SIZE

            const tourisms = await Tourism.find().or([
                { name: { $regex: req.query.q, $options: 'i' } },
                { address: { $regex: req.query.q, $options: 'i' } }
            ])
                .skip(offset)
                .limit(size)

            return res.json(responseJson(true, tourisms))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async getByCategoryId(req, res, next) {
        try {
            if (!req.params.categoryId) {
                const err = { categoryId: { message: 'CategoryId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const pageNumber = req.query.page ? req.query.page : 1
            const offset = (pageNumber - 1) * process.env.PAGE_SIZE

            const tourisms = await Tourism.find({
                category: req.params.categoryId,
                name: { $regex: req.query.q, $options: 'i' }
            })
                .skip(offset)
                .limit(process.env.PAGE_SIZE)

            return res.json(responseJson(true, tourisms))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async getByAccountId(req, res, next) {
        try {
            const accountId = res.data.account._id

            const pageNumber = req.query.page ? req.query.page : 1
            const offset = (pageNumber - 1) * process.env.PAGE_SIZE

            const tourisms = await Tourism.find({
                account: accountId,
                name: { $regex: req.query.q, $options: 'i' }
            })
                .populate({ path: 'category', select: 'name' })
                .skip(offset)
                .limit(process.env.PAGE_SIZE)

            return res.json(responseJson(true, tourisms))
        }
        catch (err) {
            console.log(err)
            return res.json(responseJson(false, err.errors))
        }
    }

    async getById(req, res, next) {
        try {
            if (!req.params.tourismId) {
                const err = { tourismId: { message: 'TourismId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const tourism = await Tourism.findOne({ _id: req.params.tourismId })
            if (!tourism) {
                const err = { tourism: { message: 'Tourism does not exist!' } }
                return res.json(responseJson(false, err))
            }

            return res.json(responseJson(true, tourism))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async create(req, res, next) {
        try {
            const newTourism = new Tourism(req.body)

            newTourism.account = res.data.account._id

            const category = await Category.findOne({ _id: req.body.category })
            if (!category) {
                const err = { category: { message: 'Category does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var images = req.files
            if (images) {
                const urlArr = images.map(value => value.path)
                newTourism.images = urlArr
            }

            await newTourism.save()

            return res.json(responseJson(true, newTourism))
        }
        catch (err) {
            if (images) {
                images.forEach(element => {
                    cloudinary.uploader.destroy(element.filename)
                });
            }
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

            if (req.body.category) {
                const category = await Category.findOne({ _id: req.body.category })
                if (!category) {
                    const err = { category: { message: 'Category does not exist!' } }
                    return res.json(responseJson(false, err))
                }
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

            await Tourism.updateOne({ _id: req.body._id }, req.body)

            return res.json(responseJson(true, req.body))
        }
        catch (err) {
            if (images) {
                images.forEach(element => {
                    cloudinary.uploader.destroy(element.filename)
                });
            }
            console.log(err)
            return res.json(responseJson(false, err.errors))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.body._id) {
                const err = { 'id': { message: 'TourismId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const resorts = await Resort.find({ tourism: req.body._id })
            if (resorts) {
                const err = { resort: { message: 'Tourism containing resort!' } }
                return res.json(responseJson(false, err))
            }

            const tourism = await Tourism.findOneAndDelete({ _id: req.body._id })
            if (!tourism) {
                const err = { 'Tourism': { message: 'Tourism does not exist!' } }
                return res.json(responseJson(false, err))
            }

            return res.json(responseJson(true))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new TourismController