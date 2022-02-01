const { validationResult } = require('express-validator')
const UserModel = require('../models/modelUser')
const RoleModel = require('../models/modelRole')
const bcryptjs = require('bcryptjs')

const controller = {
  register: (req, res) => {
    res.render('register')  
  },
  login: (req, res) => {
    res.render('login') 
  },
  show: (req, res,next) => {
    const Users = UserModel.findAll()
      Users.then((users)=>{
        res.render("manage-users.ejs", {users})
      }).catch((err) => {
        res.send(err)
      })
  },
  processRegister: async(req,res)=>{
    const resultValidation = validationResult(req)
    
    if(resultValidation.errors.length>0){
      return res.render('register',{
        errors : resultValidation.mapped(),
        oldData : req.body
      })
    }

    if(await UserModel.findByField('email', req.body.email)){
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
    UserModel.create(newUser)
    return res.redirect('/users/login')
  },
  loginProcess: async (req, res) => {
    const resultValidation = validationResult(req)
    
    if(resultValidation.errors.length > 0){
      return res.render('login',{
        errors : resultValidation.mapped(),
        oldData : req.body
      })
    }
    
    let userToLogin = await UserModel.findByField('email', req.body.email)
    
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
  updateUser: async ( req, res ) => {
    try {
      if (req.body.newpassword === req.body.confirmpassword){
        
        console.log("img", req.session.userLogged.userimage)
        let user = {
          fullname: req.body.fullname,
          email: req.body.email,
          number: req.body.number,
          address: req.body.address,
          password: bcryptjs.hashSync(req.body.newpassword, 10),
          userimage: req.file ? req.file.filename : req.session.userLogged.userimage,
          Roles_id: req.body.role
        }

        console.log(user)

        const userLogged = req.session.userLogged

        await UserModel.update(userLogged.id, user).then(result => {
          console.log(result)
          res.redirect('/')
        }).catch(err => {
            res.send(err)
        } )
      } else {
        res.redirect('/users/profile')
      }
    } catch (err) {
        res.send(err)
      return err
    }
  },
  updateUserAdmin: async (req, res, next) => {
    try {
      if (req.body.newpassword === req.body.confirmpassword) {
        const User = await UserModel.findById(req.params.id)
        let user = {
          fullname: req.body.fullname,
          email: req.body.email,
          number: req.body.number,
          address: req.body.address,
          password: bcryptjs.hashSync(req.body.newpassword, 10),
          userimage: req.file ? req.file.filename : User.userimage,
          Roles_id: req.body.role ? req.body.role : User.Roles_id
        }

        await UserModel.update(User.id, user).then(result => {
          res.redirect('/users/manage')
        }).catch(err =>  res.send(err))
        res.send(user)
      } else {
        console.log('dont match')
      }
      
    } catch(err) {
      res.send(err)
    }
  },
  detail: (req, res, next) => {

    const User = UserModel.findById(req.params.id);
    const Roles = RoleModel.findAll()

    Promise.all([User,Roles])
      .then(([user, allRoles])=>{
        res.render("user-detail.ejs",  { user:user , allRoles: allRoles })
      }).catch((err) => {
        res.send(err)
    })
  },
  adminUpdate: async (req, res, next) => {
    const User = await UserModel.findById(req.params.id)
    console.log(User)
    res.render('admin-edit-users.ejs', {
      user: User
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
  },
  delete:  async (req, res) => {
    try{ 
      UserModel.destroy(req.params.id);
      res.redirect("/users/manage")
    }catch(err){
      res.send(err)
    }
  }
}

module.exports = controller