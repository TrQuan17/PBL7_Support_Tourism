const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required!']
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

const CategoryModel = mongoose.model('categories', CategorySchema)
module.exports = CategoryModel