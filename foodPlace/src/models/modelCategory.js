const db = require('../database/models')

const Category = {
    findAll : async ()=>{
        try{
            let categories = await db.Categories.findAll()
            return categories
        }catch(err){
            console.log(err)
        }
        
    },

}
module.exports = Category
