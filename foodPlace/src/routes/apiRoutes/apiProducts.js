const express = require('express');
const router = express.Router();
const productsApiController = require('../../controllers/apiController/productsApiController')

router.get('/', productsApiController.listApi)
router.get('/:id',productsApiController.detailApi)

module.exports = router