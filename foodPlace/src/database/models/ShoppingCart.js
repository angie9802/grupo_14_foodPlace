const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ShoppingCart', {
    idShoppingCarts: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Users_idUsers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'idUsers'
      }
    }
  }, {
    sequelize,
    tableName: 'ShoppingCarts',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idShoppingCarts" },
        ]
      },
      {
        name: "fk_ShoppingCarts_Users1_idx",
        using: "BTREE",
        fields: [
          { name: "Users_idUsers" },
        ]
      },
    ]
  });
};
