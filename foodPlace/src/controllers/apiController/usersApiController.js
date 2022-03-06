const UserModel = require("../../models/modelUser");

function dataUser (users){
  let dataUser = []
  users.map(user =>{
    dataUser.push({
      id: user.id,
      fullname : user.fullname,
      email : user.email,
      detail : "http://localhost:3000/api/users/"+ user.id,
    })
  })
  return (dataUser)
}
const controller = {
  
  listUser:  (req, res, next) => {
    const users =  UserModel.findAll()
    users.then(users =>{
      return res.json({
          count : users.length,
          users : dataUser(users),
        }) 
    })
  },
  detailUser: (req, res, next) => {
    const userDetail = UserModel.findById(req.params.id);
    userDetail.then(user=>{
      return res.json({
        id: user.id,
        fullname : user.fullname,
        email : user.email,
        number : user.number,
        address : user.address,
        image : "http://localhost:3000/images/users/"+user.userimage
      })
    })

  },
};

module.exports = controller;
