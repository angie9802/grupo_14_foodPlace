const express = require('express')
const router = express.Router()
const mainController = require('../controllers/main')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', mainController.index)

router.get('/shopping-cart', authMiddleware, mainController.shoppingCart)
router.get('/create-product', mainController.createProduct)

module.exports = router