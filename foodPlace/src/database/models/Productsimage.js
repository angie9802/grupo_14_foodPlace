const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productsimages', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    image: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Productimage',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'productsimages',
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
    ]
  });
};
