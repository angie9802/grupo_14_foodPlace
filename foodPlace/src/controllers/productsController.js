const maxId = require("../utils/maxId");
const ProductModel = require("../models/modelProduct");
const CategoryModel = require("../models/modelCategory");


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
      })
      .catch((err) => {
        res.send(err)
      });
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
  update:  (req, res,next) => {
    
      let id = req.params.id;
    let product =  ProductModel.findById(id);
    product.name = req.body.name;
    product.price = req.body.price;
    product.discount = req.body.discount;
    product.Categories_id = req.body.Categories_id;
    product.image = req.file ? req.file.filename : product.image;
    product.description = req.body.description;
    
    const editProduct = ProductModel.update(id,product)
    
    console.log(req.file)

    editProduct.then(product =>{
      // console.log(product)
      res.redirect("/products/manage")
    }).catch((err)=>{
      res.send(err)
    })
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
