const fs = require('fs')
const path = require('path')
const pathView = require('../utils/pathViews')
const maxId = require('../utils/maxId')
const Product = require('../models/Product')
const productsFilePath = path.resolve(__dirname, '../data/products.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))


const controller = {
  
  //Show all products
  index: (req, res) => {
    const newProducts = Product.getProducts()
    res.render(path.resolve(__dirname, pathView('products')),{ newProducts })
  },

  //Detail Product
  detail: (req, res) => {
    let id = req.params.id;
    const products = Product.getProducts()
    const product = Product.findById(id)
    res.render(path.resolve(__dirname, pathView('detail')),{ product : product , products : products })
  },

  //Create - Form to create products
  create: (req, res) => {
    res.render(path.resolve(__dirname, pathView('create-product')))
  },

  //Create - Method to store
  store: (req, res) => {
    
    let product = {
      id: maxId(Product.getProducts()),
      image: req.file.filename,
      ...req.body
    }

    products.push(product)
    const newProducts = Product.getProducts()
    
    let jsonProducts = JSON.stringify(newProducts,null,4)
    fs.writeFileSync(productsFilePath, jsonProducts)

    res.render(path.resolve(__dirname, pathView('products')),{ newProducts })
  },
  edit: (req,res)=> {
    let id = req.params.id;
		let product = Product.findById(id)
		res.render(path.resolve(__dirname, pathView('edit-product')),{product})
    },
  
  //Update a product
  update: (req, res) => {
    let id = req.params.id
		let product = Product.findById(id)
		product.name = req.body.name;
		product.price = req.body.price;
		product.discount = req.body.discount;
		product.category = req.body.category;
		product.description = req.body.description;
		
		let jsonProducts = JSON.stringify(products,null,4);
		fs.writeFileSync(productsFilePath,jsonProducts);
		
		res.redirect('/products')
	
  },
  
  //Delete a product
  delete: (req, res) => {
    let id = req.params.id
    Product.delete(id)

    res.redirect('/products')
  }
}

module.exports = controller