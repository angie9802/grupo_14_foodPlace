const fs = require('fs')
const path = require('path')
const productsFilePath = path.resolve(__dirname, '../data/products.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
const pathView = require('../utils/pathViews')
const maxId = require('../utils/maxId')


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
    
    let product = {
      id: maxId(products),
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