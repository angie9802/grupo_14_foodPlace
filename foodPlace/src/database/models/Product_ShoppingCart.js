const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Products_ShoppingCart', {
    idProductsShoppingCarts: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Products_idProducts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'idProducts'
      }
    },
    ShoppingCarts_idShoppingCarts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ShoppingCarts',
        key: 'idShoppingCarts'
      }
    }
  }, {
    sequelize,
    tableName: 'Products_ShoppingCarts',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProductsShoppingCarts" },
        ]
      },
      {
        name: "fk_Products_has_ShoppingCarts_ShoppingCarts1_idx",
        using: "BTREE",
        fields: [
          { name: "ShoppingCarts_idShoppingCarts" },
        ]
      },
      {
        name: "fk_Products_has_ShoppingCarts_Products1_idx",
        using: "BTREE",
        fields: [
          { name: "Products_idProducts" },
        ]
      },
    ]
  });
};
