const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require("./src/routes/mainRoutes");
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

//Routes
app.use("/", mainRouter);
app.use("/menu", mainRouter);
app.use("/login", mainRouter);
app.use("/register", mainRouter);
app.use("/detail-product", mainRouter);
app.use("/shopping-cart", mainRouter);



app.use(express.static(path.resolve(__dirname, "./public")));

app.listen(port, () => console.log("Running server in port " + port));
