require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()

// Body parser
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.get('', (req, res) => {
    res.json('Welcome to Nodejs')
})

app.listen(process.env.PORT)