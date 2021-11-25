const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'))

const mainRouter = require('./src/routes/main');
const productsRouter = require('./src/routes/products')

app.use('/', mainRouter)
app.use('/products', productsRouter)

app.listen(port, () => console.log("server running on port " + port));
