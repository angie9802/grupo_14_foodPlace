const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Carts_has_Products', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Carts_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Carts',
        key: 'id'
      }
    },
    Products_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Carts_has_Products',
    timestamps: false,
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
        name: "fk_Carts_has_Products_Products1_idx",
        using: "BTREE",
        fields: [
          { name: "Products_id" },
        ]
      },
      {
        name: "fk_Carts_has_Products_Carts1_idx",
        using: "BTREE",
        fields: [
          { name: "Carts_id" },
        ]
      },
    ]
  });
};
