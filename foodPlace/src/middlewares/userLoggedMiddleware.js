const User = require('../models/User') 

function userLoggedMiddleware(req, res, next) {
  
  
  


  res.locals.isLogged = false

  if (req.session && req.session.userLogged){
    res.locals.isLogged =true
     res.locals.userLogged = req.session.userLogged
  }
   let emailInCookie = req.cookies.userEmail;
   let userFromCookie = User.findByField('email', emailInCookie);

  if (userFromCookie) {
    req.session.userLogged = userFromCookie;
   }
  
  

  next()
}

module.exports = userLoggedMiddleware