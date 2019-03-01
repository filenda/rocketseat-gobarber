const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')

//  makes 'flashSuccess' and 'flashError' avaiable for all views to use
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
//  'upload.single' because only a single one file is beeing uploaded
routes.post('/signup', upload.single('avatar'), UserController.store)

//  all routes that start with /app will use the authmidleware
routes.use('/app', authMiddleware)

routes.use('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)

// routes.get('/app/dashboard', (req, res) => {
//   //  it is recommend to use redis of e.g to store the user session so that
//   //  we're able to restart the server w/o losing all users sessions.
//   //  The lib 'connect-redis' is the recommend express lib to use
//   console.log(req.session.user)
//   return res.render('dashboard')
// })

module.exports = routes
