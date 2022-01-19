const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define('Product', {
    id: {
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
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Products',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,

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
        name: "fk_Products_Category1_idx",
        using: "BTREE",
        fields: [
          { name: "id_category" },
        ]
      },
    ]
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, { 
      as: "category", 
      foreignKey: "id_category"});

    Product.hasOne(models.ProductImage)

    Product.belongsToMany(models.Cart, {
      as: "carts",
      through: "Product_Cart",
      foreignKey: "id_product",
      otherKey: "id_cart",
      timestamps: false
    })

  }
  return Product
};
