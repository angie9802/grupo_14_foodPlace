const db = require('../database/models')
const Categories = require('../database/models/Categories')

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
        let productFound = Product.getProducts().find(product=> product[field]=== text)
        return productFound
    },
    store: async (dataProduct)=>{
        try{
            let newProduct = await db.Products.create(dataProduct)
            console.log(newProduct)
            return newProduct
        }catch(err){
            console.log(err)
        }
    },
    delete : (id) =>{
        const newDb = Product.getProducts().filter(item => item.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(newDb,null,4),{encoding: "utf-8"})
        return true
    },
}
module.exports = Product


