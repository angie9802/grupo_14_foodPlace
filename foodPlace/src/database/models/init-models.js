const DataTypes = require("sequelize").DataTypes;
const _carts = require("./carts");
const _categories = require("./categories");
const _products = require("./products");
const _products_carts = require("./products_carts");
const _productsimages = require("./productsimages");
const _roles = require("./roles");
const _users = require("./users");

function initModels(sequelize) {
  const carts = _carts(sequelize, DataTypes);
  const categories = _categories(sequelize, DataTypes);
  const products = _products(sequelize, DataTypes);
  const products_carts = _products_carts(sequelize, DataTypes);
  const productsimages = _productsimages(sequelize, DataTypes);
  const roles = _roles(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  products_carts.belongsTo(carts, { as: "id_carts_cart", foreignKey: "id_carts"});
  carts.hasMany(products_carts, { as: "products_carts", foreignKey: "id_carts"});

  products.associate = (models) =>{
    products.belongsTo(models.categories, { 
      as: "category", 
      foreignKey: "id_category"});
  }
  categories.associate = (models) =>{
    categories.hasMany(models.products, { 
      as: "products", 
      foreignKey: "id_category"
    });
  }
  products_carts.belongsTo(products, { as: "id_products_product", foreignKey: "id_products"});
  products.hasMany(products_carts, { as: "products_carts", foreignKey: "id_products"});
  
  products.associate = (models) => {
    products.belongsTo(models.productsimages, { 
      as: "productsimage", 
      foreignKey: "id_productimage"
    });
  }
  productsimages.hasMany(products, { as: "products", foreignKey: "id_productimage"});

  users.associate = (models) => {
    users.belongsTo(models.roles, { 
      as: "role", 
      foreignKey: "id_role"
    });
    users.belongsTo(carts, { 
      as: "carts", 
      foreignKey: "id_user"
    });
  }
  roles.associate = (models) => {
    roles.hasMany(models.users, { 
      as: "users", 
      foreignKey: "id_role"});
  }

  carts.associate = (models) => {
    carts.belongsTo(users, { 
      as: "user", 
      foreignKey: "id_user"
    });
  }
  


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
