 const express = require('express');
 const router = express.Router();
 const  imageControllerApi  = require('../../controllers/apiController/imageControllerAPI')

 router.get("/:type/:image", imageControllerApi.getImage)
 
 module.exports = router;