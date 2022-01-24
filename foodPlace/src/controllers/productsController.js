const fs = require('fs')
const path = require('path')
const pathView = require('../utils/pathViews')
const maxId = require('../utils/maxId')
const ProductModel = require('../models/modelProduct')
const CategoryModel = require('../models/modelProduct')
const productsFilePath = path.resolve(__dirname, '../data/products.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))



const controller = {
  
  //Show all products
  list: (req, res,next) => {
    const Products = ProductModel.findAll()

      Products.then((products)=>{
        res.render("products.ejs", {products})
      }).catch((err) => {
        next(err);
      })
  },

  //Detail Product
  detail: (req, res, next) => {
    const products = ProductModel.findAll()
    const Product = ProductModel.findById(req.params.id);
    const Categories = CategoryModel.findAll()

    Promise.all([Product,Categories, products])
      .then(([product, allCategories, products])=>{
        res.render("detail.ejs", {product:product , allCategories: allCategories, products:products})
      }).catch((err) => {
      next(err);
    })
     },

  //Create - Form to create products
  create: (req, res) => {
    res.render(path.resolve(__dirname, pathView('create-product')))
  },

  //Create - Method to store
  store: (req, res,next) => {

    
    const newProducts = ProductModel.findAll()
    newProducts.then((products)=>{
      console.log(newProducts)
      let newProduct = {
        id: maxId(products),
        image: req.file.filename,
        ...req.body
      }
  
      ProductModel.store(newProduct)
      console.log(newProduct)
      res.render("products.ejs", {products})
    }).catch((err) => {
      next(err);
    })
    



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