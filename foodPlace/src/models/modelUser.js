const fs = require('fs')
const path = require('path')
const usersFilePath = path.resolve(__dirname, '../data/users.json')
const maxId = require('../utils/maxId')

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
    getUsers : ()=>{
        return JSON.parse(fs.readFileSync(usersFilePath,'utf-8'))
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
    findByField :(field, text)=>{
        let userFound = User.getUsers().find(user=> user[field]=== text)
        return userFound
    },
    create : (userData) =>{
        let allUsers = User.getUsers()
        let newUser = {
            id : maxId(allUsers),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(allUsers,null,4))
        return newUser
    }, 
    delete : (id) =>{
        let finalUsers = User.getUsers().filter(user => user.id !== id)
        fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers,null,4), {encoding: "utf-8"})
        return true
    },
}
module.exports = User
