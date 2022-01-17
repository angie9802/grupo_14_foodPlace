var DataTypes = require("sequelize").DataTypes;
var _carts = require("./carts");
var _categories = require("./categories");
var _products = require("./products");
var _products_carts = require("./products_carts");
var _productsimages = require("./productsimages");
var _roles = require("./roles");
var _users = require("./users");

function initModels(sequelize) {
  var carts = _carts(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var products_carts = _products_carts(sequelize, DataTypes);
  var productsimages = _productsimages(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  products_carts.belongsTo(carts, { as: "id_carts_cart", foreignKey: "id_carts"});
  carts.hasMany(products_carts, { as: "products_carts", foreignKey: "id_carts"});
  products.belongsTo(categories, { as: "id_category_category", foreignKey: "id_category"});
  categories.hasMany(products, { as: "products", foreignKey: "id_category"});
  products_carts.belongsTo(products, { as: "id_products_product", foreignKey: "id_products"});
  products.hasMany(products_carts, { as: "products_carts", foreignKey: "id_products"});
  products.belongsTo(productsimages, { as: "id_productimage_productsimage", foreignKey: "id_productimage"});
  productsimages.hasMany(products, { as: "products", foreignKey: "id_productimage"});
  users.belongsTo(roles, { as: "id_role_role", foreignKey: "id_role"});
  roles.hasMany(users, { as: "users", foreignKey: "id_role"});
  carts.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(carts, { as: "carts", foreignKey: "id_user"});

  return {
    carts,
    categories,
    products,
    products_carts,
    productsimages,
    roles,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
