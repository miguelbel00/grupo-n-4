'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User,{
        foreignKey:'id',
        target_key:'userId'
      })
      Transaction.belongsTo(models.Category,{
        foreignKey:'id',
        target_key:'categoryId'
      })
    }
  };
  Transaction.init({
    description: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'Transaction',
  });
  return Transaction;
};