const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

const uploadFile = require('../utils/multerConfig')


//Get all products

router.get('/', productsController.list)

//Create one product
router.get('/create',authMiddleware, adminMiddleware, productsController.create)
router.post('/', uploadFile.single('image'), productsController.store)

router.get('/manage',authMiddleware, productsController.show);
//Get one product(detail)
router.get('/:id', productsController.detail); 

//Edit one product
router.get('/edit/:id',authMiddleware, adminMiddleware, productsController.edit)
router.put('/:id',productsController.update)


//Delete one product

router.delete('/:id',productsController.delete)




module.exports = router