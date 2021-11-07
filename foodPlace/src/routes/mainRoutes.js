const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')

router.get('/', mainController.index)
router.get('/menu', mainController.menu)
router.get('/login', mainController.login)
router.get('/register', mainController.register)
router.get('/detail-product', mainController.detailProduct)
router.get('/shopping-cart', mainController.shoppingCart)

module.exports = router