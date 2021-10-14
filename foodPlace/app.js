const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/index.html"))
})
app.get('/menu', (req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/menu.html"))
})
app.get('/detail-product', (req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/detail-product.html"))
})
app.get('/shopping-cart', (req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/shopping-cart.html"))
})
app.get('/login', (req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/login.html"))
})
app.get('/register', (req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/register.html"))
})

app.use(express.static(path.resolve(__dirname,'./public')))

app.listen(port, ()=>
    console.log("Running server in port "+port)
)