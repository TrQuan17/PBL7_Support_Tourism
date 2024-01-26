const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FavouriteSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: 'accounts',
        required: [true, 'Account is required!']
    },
    tourism: {
        type: Schema.Types.ObjectId,
        ref: 'tourisms',
        required: [true, 'Tourism is required!']
    }
}, {
    timestamps: true
})

const FavouriteModel = mongoose.model('favourites', FavouriteSchema)
module.exports = FavouriteModel