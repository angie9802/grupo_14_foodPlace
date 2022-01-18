const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define('products', {
    id: {
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
        model: 'categories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'products',
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
        name: "fk_products_category1_idx",
        using: "BTREE",
        fields: [
          { name: "id_category" },
        ]
      },
      {
        name: "fk_products_productsimages1_idx",
        using: "BTREE",
        fields: [
          { name: "id_productimage" },
        ]
      },
    ]
  });
  Product.associate = (models) =>{
    Product.belongsTo(models.categories, { 
      as: "category", 
      foreignKey: "id_category"
    })
    Product.hasOne(models.productsimages, { 
      foreignKey: "id_productimage"
    })
  }
  return Product 
  
};
