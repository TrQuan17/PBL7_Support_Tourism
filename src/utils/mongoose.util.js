module.exports = {
    multiMongooseToObj : mongooses => mongooses.map(mongoose => mongoose.toObject()),
    mongooseToObj : mongoose => mongoose ? mongoose.toObject() : null
}