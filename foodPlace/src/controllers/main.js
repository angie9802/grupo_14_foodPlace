const path = require('path')
const pathView = require('../utils/pathViews')

const controller = {
  index: (req, res) => {
    res.render(path.resolve(__dirname, pathView('index'))) 
  },
  menu: (req, res) => {
    res.render(path.resolve(__dirname, pathView('menu'))) 
  },
  register: (req, res) => {
    res.render(path.resolve(__dirname, pathView('register')))  
  },
  login: (req, res) => {
    res.render(path.resolve(__dirname, pathView('login'))) 
  },
  detailProduct: (req, res) => {
    res.render(path.resolve(__dirname, pathView('detail-product')))  
  },
  shoppingCart: (req, res) => {
    res.render(path.resolve(__dirname, pathView('shopping-cart')))  
  },
  editProduct: (req, res) => {
    res.render(path.resolve(__dirname, pathView('edit-product')))  
  },
  createProduct: (req,res) => {
    res.render(path.resolve(__dirname,pathView('create-product')))
  }
}

module.exports = controller