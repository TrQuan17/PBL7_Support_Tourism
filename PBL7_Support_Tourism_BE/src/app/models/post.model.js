const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema ({
    account: {
        type: Schema.Types.ObjectId,
        ref: 'accounts',
        required: [true, 'Creater is required!']
    },
    title: {
        type: String,
        required: [true, 'Title is required!']
    },
    content: {
        type: String,
        required: [true, 'Content is required!']
    },
    images: [{
        type: String
    }]
}, {
    timestamps: true
})

const PostModel = mongoose.model('posts', PostSchema)
module.exports = PostModel