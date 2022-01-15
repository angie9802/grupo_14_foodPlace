const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Product', {
    idProducts: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    producttime: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Category_idCategory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'idCategory'
      }
    },
    ProductsImages_idProductsImages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ProductsImages',
        key: 'idProductsImages'
      }
    }
  }, {
    sequelize,
    tableName: 'Products',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProducts" },
        ]
      },
      {
        name: "fk_Products_Category1_idx",
        using: "BTREE",
        fields: [
          { name: "Category_idCategory" },
        ]
      },
      {
        name: "fk_Products_ProductsImages1_idx",
        using: "BTREE",
        fields: [
          { name: "ProductsImages_idProductsImages" },
        ]
      },
    ]
  });
};
