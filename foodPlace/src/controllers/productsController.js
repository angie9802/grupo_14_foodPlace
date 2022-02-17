const maxId = require("../utils/maxId");
const ProductModel = require("../models/modelProduct");
const CategoryModel = require("../models/modelCategory");
const { validationResult } = require('express-validator');
const controller = {
  //Show all products
  
  list:  (req, res, next) => {
    const Products =  ProductModel.findAll();
    Products.then((products) => {
      res.render("products.ejs", { products });
    }).catch((err) => {
      res.send(err)
    });
  },
 
  show: (req, res, next) => {
    const Products = ProductModel.findAll();
    Products.then((products) => {
      res.render("manage-products.ejs", { products });
    }).catch((err) => {
      res.send(err)
    });
  },
  //Detail Product
  detail: (req, res, next) => {
    const products = ProductModel.findAll();
    const Product = ProductModel.findById(req.params.id);
    const Categories = CategoryModel.findAll();

    Promise.all([Product, Categories, products])
      .then(([product, allCategories, products]) => {
        res.render("detail.ejs", {
          product: product,
          allCategories: allCategories,
          products: products,
        });
      })
      .catch((err) => {
        res.send(err)
      });
  },

  //Create - Form to create products
  create: (req, res) => {
    const Categories = CategoryModel.findAll();
    Categories
      .then(allCategories=>{
        res.render("create-product.ejs", { allCategories: allCategories
        });
      }).catch((err) => {
        res.send(err)
      });
   },

  //Create - Method to store
  store: (req, res, next) => {
    const Categories = CategoryModel.findAll();
    const resultValidation = validationResult(req)
    try{
      if(resultValidation.errors.length > 0){
        Categories.then(allCategories=>{
              return res.render('create-product.ejs',{
                errors :  resultValidation.mapped(),
                oldData : req.body,
                allCategories: allCategories,
              })
          })
    }else{
    const products = ProductModel.findAll();
    products
      .then((products) => {
        let newProduct = {
          id: maxId(products),
          image: req.file.filename,
          ...req.body,
        };
        ProductModel.store(newProduct);
        res.redirect("/products/manage")
      })}
    }catch(err){
      res.send(err)
    }
  },
  edit: (req, res) => {
    let id = req.params.id;
    const product = ProductModel.findById(id);
    const Categories = CategoryModel.findAll();

    Promise.all([product, Categories])
      .then(([product, allCategories]) => {
        res.render("edit-product.ejs", {
          product: product,
          allCategories: allCategories,
        });
      })
      .catch((err) => {
        next(err);
      });
  },

  //Update a product
  update:  (req, res, next) => {
    const resultValidation = validationResult(req)
    const id = req.params.id;
    const product =  ProductModel.findById(id);
    const Categories = CategoryModel.findAll();
    try{
      if(resultValidation.errors.length > 0){
        Promise.all([product, Categories])
          .then(([product, allCategories]) => {
            const errors = resultValidation.mapped();
            const  oldData = {
                image: (req.file==undefined || errors.image.msg=="Only these extensions are allowed: .jpg, .jpe  g, .png, .PNG, .gif") ? product.image:req.file.image,
                ...req.body,
              }
              return res.render('edit-product.ejs',{
                errors : errors,
                oldData : oldData,
                product: product,
                allCategories: allCategories,
              })
            
          })
      }else{
      product.name = req.body.name;
      product.price = req.body.price;
      product.producttime = req.body.producttime;
      product.description = req.body.description;
      product.image = req.file ? req.file.filename : product.image;
      product.Categories_id = req.body.Categories_id;
    
      const editProduct = ProductModel.update(id,product)
      
      editProduct.then(product =>{
        res.redirect("/products/manage")
      }).catch((err)=>{
        res.send(err)
      })}
  }catch(err){
    res.send(err)
  }
  },

  search: async  (req, res) => {
		try {
			let query = req.query.searchbar;
			let products = await ProductModel.search(query)
        res.render("search-products.ejs", { products: products , query : query });
		} catch (err) {
      res.send(err)
		}
	},
  //Delete a product
  delete:  async (req, res) => {
    try{ 
      ProductModel.destroy(req.params.id);
      res.redirect("/products/manage")
    }catch(err){
      res.send(err)
    }
  }
};

module.exports = controller;

