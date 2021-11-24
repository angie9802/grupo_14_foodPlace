const express = require('express')
const router = express.Router()
const multer = require('multer')
const products = require('../controllers/products')



//Get all products
router.get('/', products.index)

//Create one product
router.post('/', products.create)

//Get one product(detail)
router.get('/detail/:id', products.detail); 
//Edit one product

//Delete one product


module.exports = router