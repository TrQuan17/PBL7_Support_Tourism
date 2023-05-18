const Service = require('../models/service.model')
const Resort = require('../models/resort.model')

class ServiceController {
    async getByResortId(req, res, next) {
        try {
            if(!req.body.resortId) {
                return res.json({ 'resortId': { message: 'ResortId does not exist!' } })
            }
    
            const services = await Serivice.find({ resort: req.body.resortId })
                .populate({ path: 'resort' })

            return res.json(services)
        }
        catch(err) {
            return res.json({ err: err.errors })
        }
    }

    async create(req, res, next) {
        try {
            const newService = new Service(req.body)

            const resort = await Resort.findOne({ _id: req.body.resort })
            if(!resort) {
                return res.json({ 'resort': { message: 'Resort does not exist!' } })
            }

            await newService.save()
            return res.json(newService)
        }
        catch(err) {
            return res.json({ err: err.errors })
        }
    }

    async update(req, res, next) {
        try {
            if(!req.body.id) {
                return res.json({ 'id': { message: 'ServiceId does not exist!' } })
            }

            const service = await Service.findOne({ _id: req.body.id })
            if(!service) {
                return res.json({ 'service': { message: 'Service does not exist!' } })
            }

            const resort = await Resort.findOne({ _id: req.body.resort })
            if(!resort) {
                return res.json({ 'resort': { message: 'Resort does not exist!' } })
            }

            await Service.updateOne({ _id: req.body.id }, req.body)

            return res.json(req.body)
        }
        catch(err) {
            return res.json({ err: err.errors })
        }
    }

    async delete(req, res, next) {
        try {
            if(!req.body.id) {
                return res.json({ 'id': { message: 'ServiceId does not exist!' } })
            }

            const service = await Service.findOneAndDelete({ _id: req.body.id })
            if(!service) {
                return res.json({ 'service': { message: 'Service does not exist!' } })
            }

            return res.json(service)
 
        }
        catch(err) {
            return res.json({ err: err.errors })
        }
    }
}

module.exports = new ServiceController