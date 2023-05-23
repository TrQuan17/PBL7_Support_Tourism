const Favourite = require('../models/favourite.model')
const Account = require('../models/account.model')
const Tourism = require('../models/tourism.model')

const { responseJson } = require('../../config/response')

class FavouriteController {
    async getByAccountId(req, res, next) {
        try {
            if (!req.params.accountId) {
                const err = { 'accountId': { message: 'AccountId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            var favourites = await Favourite.find({ account: req.params.accountId })
                .populate({ path: 'tourism' })

            return res.json(responseJson(true, favourites))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async create(req, res, next) {
        try {
            var newFavourite = new Favourite(req.body)

            var account = await Account.findOne({ _id: req.body.account })
            if (!account) {
                const err = { account: { message: 'Account does not exist!' } }
                return res.json(responseJson(false, err)) 
            }

            var tourism = await Tourism.findOne({ _id: req.body.tourism })
            if (!tourism) { 
                const err = { tourism: { message: 'Tourism does not exist!' } }
                return res.json(responseJson(false, err)) 
            }

            var favourite = await Favourite.findOne({
                account: req.body.account,
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
            if (!req.body.id) {
                const err = { id: { message: 'FavouriteId does not exist!' } }
                return res.json(responseJson(false, err)) 
            }

            var favourite = await Favourite.findOne({ _id: req.body.id })
            if (!favourite) { 
                const err = { favourite: { message: 'Favourite does not exist!' } }
                return res.json(responseJson(false, err)) 
            }

            await Favourite.deleteOne({ _id: req.body.id })

            return res.json(responseJson(true, favourite))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new FavouriteController