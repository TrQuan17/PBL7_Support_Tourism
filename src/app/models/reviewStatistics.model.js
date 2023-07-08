const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewStatisticsSchema = new Schema({
    type: {
        type: String,
        enum: ['tourisms', 'resorts']
    },
    typeRef: {
        type: Schema.Types.ObjectId,
        refPath: 'type'
    },
    positivePercent: {
        type: Number
    }
})

const ReviewStatisticsModel = mongoose.model('reviewStatistics', ReviewStatisticsSchema)
module.exports = ReviewStatisticsModel