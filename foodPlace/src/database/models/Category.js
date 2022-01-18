const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Category =  sequelize.define('Category', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Categories',
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
  Category.associate = (models) => {
    Category.hasMany(models.Product, { 
      as: "products", 
      foreignKey: "id_category"
    });
  }
  return Category
};
