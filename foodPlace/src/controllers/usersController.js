const { validationResult } = require('express-validator')
const UserModel = require('../models/modelUser')
const bcryptjs = require('bcryptjs')

const controller = {
  register: (req, res) => {
    res.render('register')  
  },
  login: (req, res) => {
    res.render('login') 
  },
  list: (req, res,next) => {
    const Users = UserModel.findAll()
      console.log(Users)
      Users.then((users)=>{
        res.render("manage-users.ejs", {users})
      }).catch((err) => {
        next(err);
      })
  },
  processRegister: (req,res)=>{
    const resultValidation = validationResult(req)
    
    if(resultValidation.errors.length>0){
      return res.render('register',{
        errors : resultValidation.mapped(),
        oldData : req.body
      })
    }

    if(User.findByField('email',req.body.email)){
      return res.render('register',{
        errors : {
          email :{
            msg: 'This email already exists'
          }
        },
        oldData : req.body
      })
    }
    if (req.body.password !== req.body.cpassword){
      return res.render('register',{
        errors : {
          password :{
            msg: 'Passwords do not match'
          },
          cpassword :{
            msg: 'Passwords do not match'
          }
        },
        oldData : req.body
      })

    }
    
    const newUser = {
      fullname: req.body.fullname,
      email: req.body.email,
      number: req.body.number,
      address: req.body.address,
      role : req.body.role,
      password : bcryptjs.hashSync(req.body.password, 10),
      userImage : req.file.filename
    }
    User.create(newUser)
    return res.redirect('/users/login')
    //return res.send(newUser)
  },
  loginProcess: (req, res) => {
    const resultValidation = validationResult(req)
    
    if(resultValidation.errors.length>0){
      console.log(resultValidation)
      return res.render('login',{
        errors : resultValidation.mapped(),
        oldData : req.body
      })
    }
    let userToLogin = User.findByField('email', req.body.email)

    if (userToLogin){
      let checkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
      if (checkPassword){
        delete userToLogin.password;
        req.session.userLogged = userToLogin;

        if(req.body.remember){
          res.cookie('userEmail', req.body.email, {
            maxAge: (10000 * 60) * 60
          })
        }

        return res.redirect('/users/profile')
      }
        return res.render('login', {
          errors: {
            password: {
              msg: "The provided credentials are invalid"
            }
          }
        })
      

    }
      return res.render('login', {
        errors: {
          email: {
            msg: "The provided email does not exist"
          }
        }
      })
    
  },
  profile: (req, res) => {
    
		return res.render('userProfile', {
      user: req.session.userLogged
    });
	},
  logout: (req, res) => {
    res.clearCookie("userEmail")
    
    req.session.destroy()
    
    return res.redirect('/')
  }
}

module.exports = controller