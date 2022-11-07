'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'id',
        target_key: 'roleId'
      })
      User.hasMany(models.Transaction, {
        foreignKey: 'userId'
      })
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'User',
  });
  return User;
};