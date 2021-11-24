const express = require('express')
const router = express.Router()
const mainController = require('../controllers/main')

router.get('/', mainController.index)
router.get('/login', mainController.login)
router.get('/register', mainController.register)
router.get('/shopping-cart', mainController.shoppingCart)
router.get('/edit-product', mainController.editProduct)
router.get('/create-product', mainController.createProduct)

module.exports = router