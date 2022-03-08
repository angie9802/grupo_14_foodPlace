const ProductModel = require("../../models/modelProduct");
const CategoryModel = require("../../models/modelCategory");
const res = require("express/lib/response");



function dataProduct (products, protocol, host){
  let dataProduct = []
  products.map(product => {
    dataProduct.push({
      id: product.id,
      name : product.name,
      price : product.price,
      category: product.Category.name,
      productTime : product.producttime,
      description :  product.description,
      image : protocol +"://"+host+"/images/products/"+ product.image,
      detail : protocol + "://"+ host+ "/api/products/"+ product.id,
    })
  })
  return (dataProduct)
}

const controller = {
  

  
  listApi: (req, res,next) => {
    let quantityCategory = [];
    let categoriesArray = [];
    const products =  ProductModel.findAllApi()
    const allCategories =  CategoryModel.findAll();
    console.log(req.protocol)
    allCategories.then(item => {
      item.map(category =>{
        let categoryValues  = category.dataValues
        categoriesArray.push(categoryValues)
      })
    })
    const countByCategory = ProductModel.countByCategory()
   
    countByCategory.then(counts =>{
      counts.map(item =>{
        const categoryData = categoriesArray.find(cat => cat.id === item.dataValues.Categories_id)
        quantityCategory.push({ category: categoryData.name , quantity: item.dataValues.Count })
    })
    
    products.then(products => {
      return res.json({
        count: products.length,
        countByCategory: quantityCategory,
        products : dataProduct(products, req.protocol, req.headers.host),
      }) 
    })
  .catch((err) => {
    next(err);
  })
  })


  },
  detailApi: (req, res, next) => {
    const productDetail = ProductModel.findById(req.params.id);
    productDetail.then(product=>{
      return res.json({
        id: product.id,
        name: product.name,
        price: product.price,
        producttime: product.producttime,
        description: product.description,
        category: product.Category.name,
        image : req.protocol +"://"+req.headers.host+"/images/products/"+ product.image
       
      })
    })

  },
  
}

module.exports = controller;

