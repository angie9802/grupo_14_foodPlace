const path = require("path");
const pathView = require("../utils/pathViews");
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
      next(err);
    });
  },
 
  show: (req, res, next) => {
    const Products = ProductModel.findAll();
    Products.then((products) => {
      res.render("manage-products.ejs", { products });
    }).catch((err) => {
      next(err);
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
        next(err);
      });
  },

  //Create - Form to create products
  create: (req, res) => {
    res.render(path.resolve(__dirname, pathView("create-product")));
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
        const newProducts = ProductModel.findAll();
        newProducts.then((products) => {
          res.render("products.ejs", { products });
        });
      })
      .catch((err) => {
        next(err);
      });
  },
  edit: (req, res) => {
    let id = req.params.id;
    let product = ProductModel.findById(id);
    product
      .then((product) => {
        res.render("edit-product", { product: product });
      })
      .catch((err) => {
        next(err);
      });
  },

  //Update a product
<<<<<<< HEAD
  update:  (req, res,next) => {
    
      let id = req.params.id;
    let product =  ProductModel.findById(id);
    product.name = req.body.name;
    product.price = req.body.price;
    product.discount = req.body.discount;
    product.category = req.body.category;
    product.image = req.file ? req.file.filename : product.image;
    product.description = req.body.description;
    
    const editProduct = ProductModel.update(id,product)
    
    console.log(req.file)

    editProduct.then(product =>{
      // console.log(product)
      res.redirect("/products")
    }).catch((err)=>{
      next(err)
    })
=======
  update: (req, res) => {
    

    res.redirect("/products");
>>>>>>> c4021a32d6b105d1c0927a704a7609b6e03ad42f
  },

  search: async  (req, res) => {
		try {
			let query = req.query.searchbar;
			let products = await ProductModel.search(query)
     
        res.render("search-products.ejs", { products: products , query : query });
      

		} catch (err) {
			console.log(err);
		}
	},
  //Delete a product
  delete:  async (req, res) => {
    try{ 
      ProductModel.destroy(req.params.id);
      res.redirect("/products/manage")
    }catch(err){
      console.log(err)
    }
  }
};

module.exports = controller;
