var DataTypes = require("sequelize").DataTypes;
var _Category = require("./Category");
var _Products = require("./Products");
var _ProductsImages = require("./ProductsImages");
var _Products_ShoppingCarts = require("./Products_ShoppingCarts");
var _Roles = require("./Roles");
var _ShoppingCarts = require("./ShoppingCarts");
var _Users = require("./Users");

function initModels(sequelize) {
  var Category = _Category(sequelize, DataTypes);
  var Products = _Products(sequelize, DataTypes);
  var ProductsImages = _ProductsImages(sequelize, DataTypes);
  var Products_ShoppingCarts = _Products_ShoppingCarts(sequelize, DataTypes);
  var Roles = _Roles(sequelize, DataTypes);
  var ShoppingCarts = _ShoppingCarts(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Products.belongsTo(Category, { as: "Category_idCategory_Category", foreignKey: "Category_idCategory"});
  Category.hasMany(Products, { as: "products", foreignKey: "Category_idCategory"});
  Products_ShoppingCarts.belongsTo(Products, { as: "Products_idProducts_Product", foreignKey: "Products_idProducts"});
  Products.hasMany(Products_ShoppingCarts, { as: "products_shoppingcarts", foreignKey: "Products_idProducts"});
  Products.belongsTo(ProductsImages, { as: "ProductsImages_idProductsImages_ProductsImage", foreignKey: "ProductsImages_idProductsImages"});
  ProductsImages.hasMany(Products, { as: "products", foreignKey: "ProductsImages_idProductsImages"});
  Users.belongsTo(Roles, { as: "Roles_idRoles_Role", foreignKey: "Roles_idRoles"});
  Roles.hasMany(Users, { as: "users", foreignKey: "Roles_idRoles"});
  Products_ShoppingCarts.belongsTo(ShoppingCarts, { as: "ShoppingCarts_idShoppingCarts_ShoppingCart", foreignKey: "ShoppingCarts_idShoppingCarts"});
  ShoppingCarts.hasMany(Products_ShoppingCarts, { as: "products_shoppingcarts", foreignKey: "ShoppingCarts_idShoppingCarts"});
  ShoppingCarts.belongsTo(Users, { as: "Users_idUsers_User", foreignKey: "Users_idUsers"});
  Users.hasMany(ShoppingCarts, { as: "shoppingcarts", foreignKey: "Users_idUsers"});

  return {
    Category,
    Products,
    ProductsImages,
    Products_ShoppingCarts,
    Roles,
    ShoppingCarts,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
