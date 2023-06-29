const express = require('express')
const router = express.Router()

const accountController = require('../app/controllers/account.controller')
const tripController = require('../app/controllers/trip.controller')
const favouriteController = require('../app/controllers/favourite.controller')
const tourismController = require('../app/controllers/tourism.controller')
const resortController = require('../app/controllers/resort.controller')
const serviceController = require('../app/controllers/service.controller')
const postController = require('../app/controllers/post.controller')

const { verifyAccount, verifyManagerRole, verifyAdminRole } = require('../app/middlewares/authorization.middleware')

router.get('/me/trips', verifyAccount, tripController.getByAccountId)
router.get('/me/favourites', verifyAccount, favouriteController.getByAccountId)
router.get('/me', verifyAccount, accountController.myAccount)

router.get('/tourisms', verifyAccount, verifyManagerRole, tourismController.getByAccountId)
router.get('/resorts', verifyAccount, verifyManagerRole, resortController.getByAccountId)
router.get('/services', verifyAccount, verifyManagerRole, serviceController.getByAccountId)

router.get('/:accountId/timeline', verifyAccount, postController.getByAccountId)
router.get('/:accountId', accountController.getById)

router.get('/', verifyAccount, verifyAdminRole, accountController.getAll)

router.post('/register', accountController.register)
router.post('/login', accountController.login)
router.patch('/update/info', verifyAccount, accountController.update)
router.patch('/update/password', verifyAccount, accountController.changePass)

module.exports = router