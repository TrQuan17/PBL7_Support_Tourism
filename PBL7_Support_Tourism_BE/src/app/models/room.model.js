const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
    name: {
        type: String, 
        unique: [true, '{VALUE} is exist!'],
        required: [true, 'Name is required!']
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'Price is required!']
    },
    limit: {
        type: Number,
        required: [true, 'Limit is required!']
    },
    count: {
        type: Number
    },
    resort: {
        type: Schema.Types.ObjectId,
        required: [true, 'Resort is required!']
    }
}, {
    timestamps: true
})

const RoomModel = mongoose.model('rooms', RoomSchema)
module.exports = RoomModel