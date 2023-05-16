const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FavouriteSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'accounts',
        required: true
    },
    tourismId: {
        type: Schema.Types.ObjectId,
        ref: 'tourisms',
        required: true
    }
}, {
    timestamps: true
})

const FavouriteModel = mongoose.model('favourites', FavouriteSchema)
module.exports = FavouriteModel