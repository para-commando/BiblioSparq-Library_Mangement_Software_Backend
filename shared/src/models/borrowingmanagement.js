'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class borrowingManagement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  borrowingManagement.init({
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    book_isbn: DataTypes.STRING,
    borrowed_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    returned_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'borrowingManagement',
    tableName: 'borrowing_management'
  });
  return borrowingManagement;
};