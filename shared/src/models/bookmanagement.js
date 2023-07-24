'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookManagement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bookManagement.init({
    isbn13: DataTypes.STRING,
    isbn10: DataTypes.STRING,
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    authors: DataTypes.STRING,
    categories: DataTypes.STRING,
    publishedYear: DataTypes.STRING,
    status: DataTypes.STRING,
    originalNumberOfCopies: DataTypes.INTEGER,
    numberOfCopiesLeft: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bookManagement',
    tableName: 'book_management'
  });
  return bookManagement;
};