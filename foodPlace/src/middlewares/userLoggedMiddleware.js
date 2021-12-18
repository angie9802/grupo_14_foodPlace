const User = require('../models/User') 

function userLoggedMiddleware(req, res, next) {
  
  let emailInCookie = req.cookies.userEmail;
  let userFromCookie = User.findByField('email', emailInCookie);

  if (userFromCookie) {
    req.session.userLogged = userFromCookie;
  }
  
  console.log(userFromCookie)

  next()
}

module.exports = userLoggedMiddleware