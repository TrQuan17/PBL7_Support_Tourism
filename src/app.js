require('dotenv').config()

const path = require('path')
const cookieParser = require('cookie-parser')
const express = require('express')
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

// Cookie parser
app.use(cookieParser())

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Router
routes(app)

app.listen(process.env.PORT)