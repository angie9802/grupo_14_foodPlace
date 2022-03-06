const express = require('express');
const router = express.Router();
const usersApiController = require('../../controllers/apiController/usersApiController')


router.get('/', usersApiController.listUser)
router.get('/:id', usersApiController.detailUser)

module.exports= router
