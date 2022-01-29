const User = require('../models/modelUser') 

async function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false

  if (req.session && req.session.userLogged){
     res.locals.isLogged = true
     res.locals.userLogged = req.session.userLogged
  }
  let emailInCookie = req.cookies.userEmail;
  let userFromCookie = await User.findByField('email', emailInCookie);
  if (userFromCookie) {
     req.session.userLogged = await userFromCookie;
  } else {
    req.session.userLogged = false
  }

  next()
}

module.exports = userLoggedMiddleware