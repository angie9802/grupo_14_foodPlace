const express = require('express')
const path = require('path')
const router = express.Router()
const usersController = require('../controllers/users')
const multer = require('multer')
const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require('../middlewares/authMiddleware')

const { body } = require('express-validator');

const storage = multer.diskStorage({
  
    destination: function(req, file, cb){
      cb(null, 'public/img/users')
    },
    
    filename: function(req, file, cb){
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    }
    
  })
    
const uploadFile = multer({ storage })

const validations = [
  body('fullname').notEmpty().withMessage('Enter a name'),
  body('email')
              .notEmpty().withMessage('Enter an email').bail()
              .isEmail().withMessage('Enter a valid email'),
  body('number').notEmpty().withMessage('Enter a number'),
  body('address').notEmpty().withMessage('Enter an address'),
  body('password')
              .notEmpty().withMessage('Enter a password').bail()
              .isLength({ min: 5 }).withMessage('Minimum length is 5'),
  body('cpassword')
              .notEmpty().withMessage('Confirm the password'),
  body('userImage').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.PNG','.gif'];
		
		if (!file) {
			throw new Error('Select and image');
		} else {
			if (!acceptedExtensions.includes(path.extname(file.originalname))) {
				throw new Error(`Only these extensions are allowed: ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]


router.get('/register',guestMiddleware, usersController.register)
router.post('/register',  uploadFile.single('userImage'), validations ,usersController.processRegister)


router.get('/login',guestMiddleware, usersController.login)
router.post('/login', usersController.loginProcess)

router.get('/profile',authMiddleware, usersController.profile);

//Logout
router.get('/logout', usersController.logout);

module.exports = router
