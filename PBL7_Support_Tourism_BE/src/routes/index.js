const accountRouter = require('./account.router')
const categoryRouter = require('./category.router')
const tourismRouter = require('./tourism.router')
const resortRouter = require('./resort.router')
const serviceRouter = require('./service.router')
const roomRouter = require('./room.router')
const reviewRouter = require('./review.router')
const favouriteRouter = require('./favourite.router')
const tripRouter = require('./trip.router')
const postRouter = require('./post.router')
const reviewStatisticsRouter = require('./reviewStatistics.router')

function routes(app) {
    app.use('/account', accountRouter)
    app.use('/category', categoryRouter)
    app.use('/tourism', tourismRouter)
    app.use('/resort', resortRouter)
    app.use('/service', serviceRouter)
    app.use('/room', roomRouter)
    app.use('/review', reviewRouter)
    app.use('/favourite', favouriteRouter)
    app.use('/trip', tripRouter)
    app.use('/post', postRouter)
    app.use('/statistics', reviewStatisticsRouter)
}

module.exports = routes