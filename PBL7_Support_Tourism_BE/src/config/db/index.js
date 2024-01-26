const mongoose = require('mongoose')
const URL = process.env.MONGO_URL

async function connectMongo() {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect mongoDB success!')
    } catch (error) {
        console.log(error)
        console.log('Connect failed!')
    }
}

module.exports = { connectMongo }