require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()

const db = require('./config/db')
const routes = require('./routes')

// Connect mongoDB
db.connectMongo()

// Body parser
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

// Router
routes(app)

app.listen(process.env.PORT)