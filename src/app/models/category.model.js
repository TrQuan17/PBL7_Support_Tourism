const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    background: {
        type: String,
    }, 
    about: {
        type: String
    }
}, {
    timestamps: true
})

const CategoryModel = mongoose.model('categorys', CategorySchema)
module.exports = CategoryModel