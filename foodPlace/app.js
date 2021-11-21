const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require("./src/routes/mainRoutes");
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false}));
app.use(express.json())

//Routes
app.use("/", mainRouter);
app.use("/menu", mainRouter);
app.use("/login", mainRouter);
app.use("/register", mainRouter);
app.use("/detail-product", mainRouter);
app.use("/shopping-cart", mainRouter);
app.use("/create-product",mainRouter);


app.use(express.static(path.resolve(__dirname, "./public")));

app.listen(port, () => console.log("server running on port " + port));
