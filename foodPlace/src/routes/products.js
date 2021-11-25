const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const products = require('../controllers/products')
const uploadFile = require('../utils/multerConfig')


//Get all products
router.get('/', products.index)

//Create one product
router.get('/create', products.create)
router.post('/', uploadFile.single('image'), products.store)

//Get one product(detail)
router.get('/detail/:id', products.detail); 
//Edit one product

//Delete one product


module.exports = router