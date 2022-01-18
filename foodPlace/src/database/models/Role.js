const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Role =  sequelize.define('Role', {
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
    tableName: 'Roles',
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
  Role.associate = (models) =>{
    Role.hasMany(models.User, { 
      as: "users", 
      foreignKey: "id_role"});
  }
  return Role
};
