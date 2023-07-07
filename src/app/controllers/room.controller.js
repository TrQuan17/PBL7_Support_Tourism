const cloudinary = require('cloudinary').v2

const { responseJson } = require('../../config/response')
const Room = require('../models/room.model')
const Resort = require('../models/resort.model')

class RoomController {
    async getByResortId(req, res, next) {
        try {
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

            var image = req.file
            newRoom.image = image ? image.path : ''

            await newRoom.save()

            if(resort.price === 0 || resort.price > newRoom.price) {
                await Resort.updateOne({ _id: req.body.resort }, { price: newRoom.price })
            }

            return res.json(responseJson(true, newRoom))
        }
        catch (err) {
            if (image) {
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

            const room = await Room.findOneAndDelete({ _id: req.body._id })
            if (!room) {
                const err = { room: { message: 'Room does not exist!' } }
                return res.json(responseJson(false, err))
            }

            return res.json(responseJson(true, room))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new RoomController