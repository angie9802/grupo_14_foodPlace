const ProductModel = require("../../models/modelProduct");
const CategoryModel = require("../../models/modelCategory");



function dataProduct (products){
  let dataProduct = []
  products.map(product => {
    dataProduct.push({
      id: product.id,
      name : product.name,
      price : product.price,
      category: product.Category.name,
      productTime : product.producttime,
      description :  product.description,
      detail : "http://localhost:3000/api/products/"+ product.id,
    })
  })
  return (dataProduct)
}
  


const controller = {
  

  
  listApi: (req, res,next) => {
    const products =  ProductModel.findAllApi()
    const categories =  CategoryModel.findAll();
    
    let Categories = [];
    console.log(categories)
    categories.then(items => {
      items.map(category =>{
        let product = category.dataValues
        Categories.push(product)
      })
    })
    const dbProductByCate = ProductModel.countByCategory()


  let Catego = [];
   
    dbProductByCate.then(items =>{
    items.map(item1 =>{
      let id = item1.dataValues.Categories_id;
      
      let count = item1.dataValues.Count;
      
      let Cat = Categories.find(cat => cat.id === id)
      
      let nameCat = Cat.name
      
      
      
      Catego.push({idCategory: id, Category: nameCat, Count:count})
     
    })
    
  })

    products.then(products => {
      return res.json({
        count: products.length,
        countByCategory: Catego,
        products : dataProduct(products),
      }) 
    })
  .catch((err) => {
    next(err);
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
        image : "http://localhost:3000/images/products/"+ product.image
      })
    })

  },
  
}

module.exports = controller;

