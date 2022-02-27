const db = require('../database/models')


const User = {
    findAll : async ()=>{
      try{
        let users = await db.Users.findAll()
        return users
      }catch(err){
        console.log(err)
      }
    },
    findById : async (id) =>{
        try{
          let user = await db.Users.findByPk(id,{
            include: ["Role"]
          })
          return user
        }catch(err){
            console.log(err)
        }
        
    },
    findByField : async(field, text)=>{
      try {
        const allUsers = await db.Users.findAll()
        const userFound = await allUsers.find(user => user[field] === text)
        return userFound
      } catch (err) {
        console.log(err)
        return err
      }
    },
    create : async (userData) =>{
      try {
        let newUser = await db.Users.create({
          userimage: userData.userImage,
          Roles_id: userData.role,
          ...userData
        })
      } catch(err) {
        console.log(err)
      }
    }, 
    update: async (id, user) => {
      try {
        let userUpdate = {
          ...user
        }
        await db.Users.update(userUpdate, {
          where: {
            id: id
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    destroy: async (id) => {
        try{
             await db.Users.destroy({
                where : {
                    id :id
                }
            })
        }catch(err){
            console.log(err)
        }
       
    }
}
module.exports = User


