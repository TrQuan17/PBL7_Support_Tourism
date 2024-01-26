const Favourite = require('../models/favourite.model')
const Account = require('../models/account.model')
const Tourism = require('../models/tourism.model')

const { responseJson } = require('../../config/response')

class FavouriteController {
    async getByAccountId(req, res, next) {
        try {
            const favourites = await Favourite.find({ account: res.data.account._id })
                .populate({ path: 'tourism', select: '_id name images address' })

            return res.json(responseJson(true, favourites))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async create(req, res, next) {
        try {
            const newFavourite = new Favourite(req.body)
            newFavourite.account = res.data.account._id

            const tourism = await Tourism.findOne({ _id: req.body.tourism })
            if (!tourism) { 
                const err = { tourism: { message: 'Tourism does not exist!' } }
                return res.json(responseJson(false, err)) 
            }

            const favourite = await Favourite.findOne({
                account: res.data.account._id,
                tourism: req.body.tourism
            })
            if (favourite) {
                const err = { favourite: { message: 'Favorite already exists!' } }
                return res.json(responseJson(false, err))
            }

            await newFavourite.save()

            return res.json(responseJson(true, newFavourite))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }
    async delete(req, res, next) {
        try {
            if (!req.body._id) {
                const err = { id: { message: 'FavouriteId does not exist!' } }
                return res.json(responseJson(false, err)) 
            }

            const favourite = await Favourite.findOne({ _id: req.body._id })
            if (!favourite) { 
                const err = { favourite: { message: 'Favourite does not exist!' } }
                return res.json(responseJson(false, err)) 
            }

            await Favourite.deleteOne({ _id: req.body._id })

            return res.json(responseJson(true, favourite))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new FavouriteController