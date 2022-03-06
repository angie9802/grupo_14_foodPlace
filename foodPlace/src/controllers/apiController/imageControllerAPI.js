 const path = require("path");
 const fs = require("fs")

 const controller = {
      async getImage  (req, res)  {
         const type = req.params.type;
         const image = req.params.image;
         const pathImage = path.resolve(__dirname, `../../../public/img/${type}/${image}`);
         if (await fs.existsSync(pathImage)){
             res.sendFile(pathImage);
         }else{
             const pathNoImage = path.resolve(__dirname, '../../../public/img/not-found.png');
             res.sendFile(pathNoImage);
         }
     }
 }

module.exports = controller;