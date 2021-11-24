const fs = require('fs')
const path = require('path')
const multer = require('multer')
const pathView = require('../utils/pathViews')
const maxId = require('../utils/maxId')
const productsFilePath = path.resolve(__dirname, '../data/products.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))


const controller = {
  
  //Show all products
  index: (req, res) => {
    
  },

  //Detail Product
  detail: (req, res) => {
    
  },

  //Create a new product
  create: (req, res) => {

    console.log(req.file)
    
    let product = {
      id: maxId(products),
      image: req.file.filename,
      ...req.body
    }

    products.push(product)
    
    let jsonProducts = JSON.stringify(products,null,4)
    fs.writeFileSync(productsFilePath, jsonProducts)
    
  },
  
  //Update a product
  update: (req, res) => {
    
  },
  
  //Delete a product
  delete: (req, res) => {
    
  }
}

module.exports = controller