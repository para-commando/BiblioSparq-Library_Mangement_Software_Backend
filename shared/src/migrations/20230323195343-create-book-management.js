'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('book_management', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isbn13: {
        type: Sequelize.STRING
      },
      isbn10: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      subtitle: {
        type: Sequelize.STRING
      },
      authors: {
        type: Sequelize.STRING
      },
      categories: {
        type: Sequelize.STRING
      },
      publishedYear: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      originalNumberOfCopies: {
        type: Sequelize.INTEGER
      },
      numberOfCopiesLeft: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('book_management');
  }
};