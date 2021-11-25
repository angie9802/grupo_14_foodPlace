const path = require('path')
const pathView = require('../utils/pathViews')

const controller = {
  index: (req, res) => {
    res.render(path.resolve(__dirname, pathView('index'))) 
  },
  register: (req, res) => {
    res.render(path.resolve(__dirname, pathView('register')))  
  },
  login: (req, res) => {
    res.render(path.resolve(__dirname, pathView('login'))) 
  },
  shoppingCart: (req, res) => {
    res.render(path.resolve(__dirname, pathView('shopping-cart')))  
  },
  editProduct: (req, res) => {
    res.render(path.resolve(__dirname, pathView('edit-product')))  
  }
}

module.exports = controller