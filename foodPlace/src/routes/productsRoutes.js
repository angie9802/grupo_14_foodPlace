const express = require('express')
const router = express.Router()
const products = require('../controllers/productsController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

const uploadFile = require('../utils/multerConfig')


//Get all products
router.get('/', products.list)

//Create one product
router.get('/create',authMiddleware, adminMiddleware, products.create)
router.post('/', uploadFile.single('image'), products.store)

//Get one product(detail)
router.get('/:id', products.detail); 
//Edit one product


router.get('/edit/:id',authMiddleware, adminMiddleware, products.edit)
router.put('/:id',products.update)
//Delete one product

router.delete('/:id',products.delete)


module.exports = router