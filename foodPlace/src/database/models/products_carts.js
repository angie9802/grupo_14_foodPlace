const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products_carts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_products: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    id_carts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carts',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'products_carts',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_products_has_carts_carts1_idx",
        using: "BTREE",
        fields: [
          { name: "id_carts" },
        ]
      },
      {
        name: "fk_products_has_carts_products1_idx",
        using: "BTREE",
        fields: [
          { name: "id_products" },
        ]
      },
    ]
  });
};
