const fs = require('fs')
const path = require('path')
<<<<<<< HEAD
const productsFilePath = path.resolve(__dirname, '../data/products.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
=======
const multer = require('multer')
>>>>>>> 5f15258f04272830c29761bcc73d4e36b16f62a0
const pathView = require('../utils/pathViews')
const maxId = require('../utils/maxId')
const productsFilePath = path.resolve(__dirname, '../data/products.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))


const controller = {
  
  //Show all products
  index: (req, res) => {
    res.render(path.resolve(__dirname, pathView('products')), { products })
  },

  //Detail Product
  detail: (req, res) => {
    let id = req.params.id;
    let product = products.find(item=>{
      return item.id == id
    })
    console.log(product)
    res.render(path.resolve(__dirname, pathView('detail')),{ product , products })
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