const path = require('path')

const pathViews = (viewName) => {
  return '../views/' + viewName + '.ejs'
}

const controller = {
  index: (req, res) => {
    res.render(path.resolve(__dirname, pathViews('index'))) 
  },
  menu: (req, res) => {
    res.render(path.resolve(__dirname, pathViews('menu'))) 
  },
  register: (req, res) => {
    res.render(path.resolve(__dirname, pathViews('register')))  
  },
  login: (req, res) => {
    res.render(path.resolve(__dirname, pathViews('login'))) 
  },
  detailProduct: (req, res) => {
    res.render(path.resolve(__dirname, pathViews('detail-product')))  
  },
  shoppingCart: (req, res) => {
    res.render(path.resolve(__dirname, pathViews('shopping-cart')))  
  },
  editProduct: (req, res) => {
    res.render(path.resolve(__dirname, pathViews('edit-product')))  
  },
  createProduct: (req,res) => {
    res.render(path.resolve(__dirname,pathViews('create-product')))
  }
}

module.exports = controller