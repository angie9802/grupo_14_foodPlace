const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const products = require('../controllers/products')
const uploadFile = require('../utils/multerConfig')

//Get all products
router.get('/', products.index)

//Create one product
router.post('/', uploadFile.single('image'), products.create)

//Get one product(detail)

//Edit one product

//Delete one product


module.exports = router