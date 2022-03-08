const UserModel = require("../../models/modelUser");

function dataUser (users, protocol, host){
  let dataUser = []
  users.map(user =>{
    dataUser.push({
      id: user.id,
      fullname : user.fullname,
      email : user.email,
      detail :  protocol +"://"+host+"/api/users/"+ user.id,
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
          users : dataUser(users, req.protocol, req.headers.host),
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
        image : req.protocol +"://"+req.headers.host+"/images/users/"+ user.userimage
        
      })
    })

  },
};

module.exports = controller;
