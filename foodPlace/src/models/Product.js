const fs = require('fs')
const path = require('path')
const productsFilePath = path.resolve(__dirname, '../data/products.json')
const maxId = require('../utils/maxId')

const Product = {
    getProducts : ()=>{
        return JSON.parse(fs.readFileSync(productsFilePath,'utf-8'))
        
    },
    
    findById : (id) =>{
        let productFound = Product.getProducts().find(product => product.id == id)
        return productFound
    },
    findByField :(field, text)=>{
        let productFound = Product.getProducts().find(product=> product[field]=== text)
        return productFound
    },
    delete : (id) =>{
        const newDb = Product.getProducts().filter(item => item.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(newDb,null,4),{encoding: "utf-8"})
        return true
    },
}
module.exports = Product


