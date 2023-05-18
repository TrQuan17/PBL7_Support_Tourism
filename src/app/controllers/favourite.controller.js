const Favourite = require('../models/favourite.model')
const Account = require('../models/account.model')
const Tourism = require('../models/tourism.model')

class FavouriteController {
    async getByAccountId(req, res, next) {
        try {
            if (!req.params.accountId) {
                return res.json({ 'accountId': { message: 'AccountId does not exist!' } })
            }

            var favourites = await Favourite.find({ account: req.params.accountId })
                .populate({ path: 'tourism' })

            return res.json(favourites)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }

    async create(req, res, next) {
        try {
            var newFavourite = new Favourite(req.body)

            var account = await Account.findOne({ _id: req.body.account })
            if (!account) { return res.json({ 'account': { message: 'Account does not exist!' } }) }

            var tourism = await Tourism.findOne({ _id: req.body.tourism })
            if (!tourism) { return res.json({ 'tourism': { message: 'Tourism does not exist!' } }) }

            var favourite = await Favourite.findOne({
                account: req.body.account,
                tourism: req.body.tourism
            })
            if (favourite) {
                return res.json({ 'favourite': { message: 'Favorite already exists!' } })
            }

            await newFavourite.save()

            return res.json({ newFavourite })
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }
    async delete(req, res, next) {
        try {
            if (!req.body.id) { return res.json({ 'id': { message: 'FavouriteId does not exist!' } }) }

            var favourite = await Favourite.findOne({ _id: req.body.id })
            if (!favourite) { return res.json({ 'favourite': { message: 'Favourite does not exist!' } }) }

            await Favourite.deleteOne({ _id: req.body.id })

            return res.json(favourite)
        }
        catch (err) {
            return res.json({ err: err.errors })
        }
    }
}

module.exports = new FavouriteController