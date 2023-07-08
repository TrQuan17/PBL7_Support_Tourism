const cloudinary = require('cloudinary').v2

const Service = require('../models/service.model')
const Resort = require('../models/resort.model')

const { responseJson } = require('../../config/response')

class ServiceController {
    async getByResortId(req, res, next) {
        try {
            if(!req.params.resortId) {
                const err = { resortId: { message: 'ResortId does not exist!' } }
                return res.json(responseJson(false, err))
            }
    
            const services = await Service.find({ resort: req.params.resortId })

            return res.json(responseJson(true, services))
        }
        catch(err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async create(req, res, next) {
        try {
            const newService = new Service(req.body)

            newService.account = res.data.account._id

            const resort = await Resort.findOne({ _id: req.body.resort })
            if(!resort) {
                const err = { resort: { message: 'Resort does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var imageUpload = req.file
            newService.image = imageUpload ? imageUpload.path : ''

            await newService.save()
            return res.json(responseJson(true, newService))
        }
        catch(err) {
            if (imageUpload) {
                cloudinary.uploader.destroy(imageUpload.filename)
            }
            return res.json(responseJson(false, err.errors))
        }
    }

    async update(req, res, next) {
        try {
            if(!req.body._id) {
                const err = { id: { message: 'ServiceId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const service = await Service.findOne({ _id: req.body._id })
            if(!service) {
                const err = { service: { message: 'Service does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const resort = await Resort.findOne({ _id: req.body.resort })
            if(!resort) {
                const err = { resort: { message: 'Resort does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var imageUpload = req.file
            req.body.image = imageUpload ? imageUpload.path : req.body.image

            await Service.updateOne({ _id: req.body._id }, req.body)

            return res.json(responseJson(true, req.body))
        }
        catch(err) {
            if (imageUpload) {
                cloudinary.uploader.destroy(imageUpload.filename)
            }
            return res.json(responseJson(false, err.errors))
        }
    }

    async delete(req, res, next) {
        try {
            if(!req.body._id) {
                const err = { id: { message: 'ServiceId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const service = await Service.findOneAndDelete({ _id: req.body._id })
            if(!service) {
                const err = { service: { message: 'Service does not exist!' } }
                return res.json(responseJson(false, err))
            }

            return res.json(responseJson(true, service))
        }
        catch(err) {
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new ServiceController