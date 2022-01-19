const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Cart = sequelize.define('Cart', {
    id: {
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
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Carts',
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
        name: "fk_ShoppingCarts_Users1_idx",
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
    ]
  });
  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      as: "user", 
      foreignKey: "id_user"
    })
    Cart.belongsToMany(models.Product, {
      as: "products",
      through: "Product_Cart",
      foreignKey: "id_cart",
      otherKey: "id_product",
      timestamps: false
    })
  }
  return Cart
};
