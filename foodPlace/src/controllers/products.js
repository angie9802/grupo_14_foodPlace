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
  edit: (req,res)=> {
    let id = req.params.id;
		let product = products.find(item =>{
			return item.id == id
		})
		res.render(path.resolve(__dirname, pathView('edit-product')),{product})
    },
  
  //Update a product
  update: (req, res) => {
    let id = req.params.id
		let product = products.find(item =>{
			return item.id == id
		})
		product.name = req.body.name;
		product.price = req.body.price;
		product.discount = req.body.discount;
		product.category = req.body.category;
		product.description = req.body.description;
		
		let jsonProducts = JSON.stringify(products,null,4);
		fs.writeFileSync(productsFilePath,jsonProducts);
		
		res.redirect('/')
	
  },
  
  //Delete a product
  delete: (req, res) => {
    let id = req.params.id;
		products.splice(id-1,id)
		let jsonProducts = JSON.stringify(products,null,4);
		fs.writeFileSync(productsFilePath,jsonProducts);
		
    res.redirect('/')
  }
}

module.exports = controller