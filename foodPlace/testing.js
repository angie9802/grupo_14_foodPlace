const bcryptjs = require('bcryptjs')
let hash = bcryptjs.hashSync('abc123',10)
let hash1 = bcryptjs.hashSync('abc123',10)
if(hash === hash1){
    console.log('iguales')
}else{
    console.log('no iguales')
}