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
router.get('/:id', products.detail); 
//Edit one product

router.get('/edit/:id', products.edit)
router.put('/:id',products.update)
//Delete one product

router.delete('/:id',products.delete)


module.exports = router