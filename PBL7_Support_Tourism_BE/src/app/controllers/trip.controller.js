const cloudinary = require('cloudinary').v2
const { responseJson } = require('../../config/response')
const Trip = require('../models/trip.model')

class TripController {
    async getByAccountId(req, res, next) {
        try {
            const trips = await Trip.find({ account: res.data.account._id })
                .populate({ path: 'account', select: 'avatar fullname' })

            return res.json(responseJson(true, trips))
        } catch (err) {
            console.log(err)
            return res.json(responseJson(false, err.errors))
        }
    }

    async getById(req, res, next) {
        try {
            if (!req.params.tripId) {
                const err = { tripId: { messagee: 'TripId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const trip = await Trip.findOne({ _id: req.params.tripId })
                .populate({ path: 'account', select: 'fullname avatar' })
                .populate({
                    path: 'favourites', 
                    populate: { path: 'tourism', select: 'name images address'}
                })

        if (!trip) {
            const err = { trip: { message: 'Trip does not exist!' } }
            return res.json(responseJson(false, err))
        }

        return res.json(responseJson(true, trip))
    }
    catch(err) {
        console.log(err)
        return res.json(responseJson(false, err.errors))
    }
}

    async create(req, res, next) {
    try {
        const newTrip = new Trip(req.body)

        newTrip.account = res.data.account._id

        var background = req.file
        newTrip.background = background ? background.path : ''

        await newTrip.save()

        return res.json(responseJson(true, newTrip))
    }
    catch (err) {
        if (background) {
            cloudinary.uploader.destroy(background.filename)
        }
        return res.json(responseJson(false, err.errors))
    }
}

    async delete (req, res, next) {
    try {
        if (!req.body._id) {
            const err = { id: { message: 'TripId does not exist!' } }
            return res.json(responseJson(false, err))
        }

        const trip = await Trip.findOneAndDelete({ _id: req.body._id })
        if (!trip) {
            const err = { trip: { message: 'Trip does not exist!' } }
            return res.json(responseJson(false, err))
        }

        return res.json(responseJson(true, trip))
    }
    catch (err) {
        return res.json(responseJson(false, err.errors))
    }
}
}

module.exports = new TripController