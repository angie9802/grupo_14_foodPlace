const express = require('express')
const router = express.Router()
const multer = require('multer')
const products = require('../controllers/products')
const mainController = require('../controllers/main')


//Get all products
router.get('/', products.index)

//Create one product
router.post('/', products.create)

//Get one product(detail)

//Edit one product
router.get('/edit-product', mainController.editProduct)

//Delete one product


module.exports = router