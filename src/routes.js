const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

routes.get('/', SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', UserController.create)
//  'upload.single' because only a single one file is beeing uploaded
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/app/dashboard', (req, res) => {
  //  it is recommend to use redis of e.g to store the user session so that
  //  we're able to restart the server w/o losing all users sessions.
  //  The lib 'connect-redis' is the recommend express lib to use
  console.log(req.session.user)
  return res.render('dashboard')
})

module.exports = routes
