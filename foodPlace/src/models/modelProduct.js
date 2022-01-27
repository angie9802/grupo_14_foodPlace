const db = require('../database/models')
const { Op } = require("sequelize");

const Product = {
    findAll : async ()=>{
        try{
            let products = await db.Products.findAll()
            return products
        }catch(err){
            console.log(err)
        }
        
    },
    
    findById : async (id) =>{
        try{
            let product = await db.Products.findByPk(id,{
                include: ["Category"]
            })
            return product
        }catch(err){
            console.log(err)
        }
        
    },
    findByField :(field, text)=>{
        let foundProduct = Product.getProducts().find(product=> product[field]=== text)
        return foundProduct
    },
    store: async (dataProduct)=>{
        try{
            let newProduct = await db.Products.create(dataProduct)
            return newProduct
        }catch(err){
            console.log(err)
        }
    },
    search : async (searchQuery) =>{
        try{
            let searchedProducts = await db.Products.findAll({
                where: {
                    name: {
                        [Op.substring]:  [searchQuery], 
                    }
                  }
            })
            return searchedProducts
        }catch{
            console.log(err)
        }
    },
    destroy: async (id) => {
        try{
             await db.Products.destroy({
                where : {
                    id :id
                }
            })
        }catch(err){
            console.log(err)
        }
    }
}
module.exports = Product

