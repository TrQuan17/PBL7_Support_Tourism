const accountRouter = require('./account.router')
const categoryRouter = require('./category.router')

function routes(app) {
    app.use('/account', accountRouter)
    app.use('/category', categoryRouter)
}

module.exports = routes