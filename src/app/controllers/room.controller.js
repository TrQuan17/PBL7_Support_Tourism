const cloudinary = require('cloudinary').v2

const { responseJson } = require('../../config/response')
const Room = require('../models/room.model')
const Resort = require('../models/resort.model')

class RoomController {
    async getByResortId(req, res, next) {
        try {
            if(!req.params.resortId) {
                const err = { resortId: { message: 'ResortId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const rooms = await Room.find({ resort: req.params.resortId })
            return res.json(responseJson(true, rooms))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async create(req, res, next) {
        try {
            const newRoom = new Room(req.body)

            const resort = await Resort.findOne({ _id: req.body.resort })
            if (!resort) {
                const err = { resort: { message: 'Resort does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var imageUpload = req.file
            newRoom.image = imageUpload ? imageUpload.path : ''

            await newRoom.save()

            if(resort.price === 0 || resort.price > newRoom.price) {
                await Resort.updateOne({ _id: req.body.resort }, { price: newRoom.price })
            }

            const reservation = resort.reservationLimit + newRoom.limit
            await Resort.updateOne({ _id: req.body.resort }, { reservationLimit: reservation })

            return res.json(responseJson(true, newRoom))
        }
        catch (err) {
            if (imageUpload) {
                cloudinary.uploader.destroy(imageUpload.filename)
            }
            return res.json(responseJson(false, err.errors))
        }
    }

    async update(req, res, next) {
        try {
            if(!req.body._id) {
                const err = { id: { message: 'RoomId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const room = await Room.findOne({ _id: req.body._id })
            if(!room) {
                const err = { room: { message: 'Room does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const resort = await Resort.findOne({ _id: req.body.resort })
            if(!resort) {
                const err = { resort: { message: 'Resort does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var imageUpload = req.file
            req.body.image = imageUpload ? imageUpload.path : req.body.image

            await Room.updateOne({ _id: req.body._id }, req.body)

            if(resort.price === 0 || resort.price > req.body.price) {
                await Resort.updateOne({ _id: req.body.resort }, { price: req.body.price })
            }

            const reservation = resort.reservationLimit - parseInt(room.limit) + parseInt(req.body.limit)
            await Resort.updateOne({ _id: req.body.resort }, { reservationLimit: reservation })

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
            if (!req.body._id) {
                const err = { roomId: { message: 'RoomId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const resort = await Resort.findOne({ _id: req.body.resort })
            if(!resort) {
                const err = { resort: { message: 'Resort does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const room = await Room.findOneAndDelete({ _id: req.body._id })
            if (!room) {
                const err = { room: { message: 'Room does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const rooms = await Room.find({ resort: resort._id }).select('price')

            let minPrices = 0

            if(rooms.length) {
                const prices = rooms.map(value => value.price)
                minPrices = prices.reduce((accumulator, element) => 
                    (accumulator < element) ? accumulator : element)
    
            }
            
            await Resort.updateOne({ _id: resort._id }, {
                reservationLimit: resort.reservationLimit - room.limit,
                price: minPrices 
            })

            return res.json(responseJson(true))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new RoomController