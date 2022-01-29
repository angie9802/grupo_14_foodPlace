const db = require('../database/models')

const Role = {
    findAll : async ()=>{
        try{
            let roles = await db.Roles.findAll()
            return roles
        }catch(err){
            console.log(err)
        }
        
    },

}
module.exports = Role
