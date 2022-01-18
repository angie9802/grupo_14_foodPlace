const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const ProductImage= sequelize.define('ProductImage', {
    idProductsImages: {
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
        model: 'Products',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'ProductsImages',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProductsImages" },
        ]
      },
      {
        name: "fk_ProductsImages_Products1_idx",
        using: "BTREE",
        fields: [
          { name: "id_product" },
        ]
      },
    ]
  });
  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, {
      as: "product", 
      foreignKey: "id_product"
    })
  }
  return ProductImage
};
