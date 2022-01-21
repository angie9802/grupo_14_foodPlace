const DataTypes = require("sequelize").DataTypes;
const _Carts = require("./Carts");
const _Carts_has_Products = require("./Carts_has_Products");
const _Categories = require("./Categories");
const _Products = require("./Products");
const _Roles = require("./Roles");
const _Users = require("./Users");

function initModels(sequelize) {
  const Carts = _Carts(sequelize, DataTypes);
  const Carts_has_Products = _Carts_has_Products(sequelize, DataTypes);
  const Categories = _Categories(sequelize, DataTypes);
  const Products = _Products(sequelize, DataTypes);
  const Roles = _Roles(sequelize, DataTypes);
  const Users = _Users(sequelize, DataTypes);

  Carts_has_Products.belongsTo(Carts, { as: "Cart", foreignKey: "Carts_id"});
  Carts.hasMany(Carts_has_Products, { as: "carts_has_products", foreignKey: "Carts_id"});
  Products.belongsTo(Categories, { as: "Category", foreignKey: "Categories_id"});
  Categories.hasMany(Products, { as: "products", foreignKey: "Categories_id"});
  Carts_has_Products.belongsTo(Products, { as: "Product", foreignKey: "Products_id"});
  Products.hasMany(Carts_has_Products, { as: "carts_has_products", foreignKey: "Products_id"});
  Users.belongsTo(Roles, { as: "Role", foreignKey: "Roles_id"});
  Roles.hasMany(Users, { as: "users", foreignKey: "Roles_id"});
  Carts.belongsTo(Users, { as: "User", foreignKey: "Users_id"});
  Users.hasMany(Carts, { as: "carts", foreignKey: "Users_id"});

  return {
    Carts,
    Carts_has_Products,
    Categories,
    Products,
    Roles,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
