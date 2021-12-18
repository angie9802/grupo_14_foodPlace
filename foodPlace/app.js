const express = require("express")
const session = require('express-session')
const path = require("path")
const port = process.env.PORT || 3000
const methodOverride = require('method-override')
const cookies = require('cookie-parser')
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware')
const app = express();

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(methodOverride('_method'))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))
app.use(cookies())
app.use(userLoggedMiddleware)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'))

const mainRouter = require('./src/routes/main');
const productsRouter = require('./src/routes/products')
const usersRouter = require('./src/routes/users')

app.use('/', mainRouter)
app.use('/products', productsRouter)
app.use('/users', usersRouter)


app.listen(port, () => console.log("server running on port " + port));
