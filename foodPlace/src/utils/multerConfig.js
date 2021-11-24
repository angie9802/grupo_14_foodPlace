const multer = require('multer')
const path = require('path')

let storage = multer.diskStorage({
  
  destination: function(req, file, cb){
    cb(null, 'public/img/products')
  },
  
  filename: function(req, file, cb){
    cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
  }
  
})
  
let uploadFile = multer({ storage })

module.exports = uploadFile