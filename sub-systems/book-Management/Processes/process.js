const logger = require('../../../shared/src/configurations/logger.configurations');
const db = require('../../../shared/src/models/index');
const { Op } = require('sequelize');
module.exports.bookManagementProcesses = {
  deleteBook: async ({ ISBN }) => {
    try {
      const numberOfRowsDeleted = await db.bookManagement.destroy({
        where: { [Op.or]: { isbn13: ISBN, isbn10: ISBN } },
      });
      if (numberOfRowsDeleted) {
        return {
          message: 'book deleted successfully',
        };
      } else {
        return {
          message:
            'Failed to delete book. Invalid ISBN or book does not exist in database.',
        };
      }
    } catch (error) {
       throw error;
    }
  },
  createBook: async ({
    ISBN,
    bookTitle,
    author,
    subtitle,
    genre,
    yearOfPublication,
    bookAvailabilityStatus,
    originalNumberOfCopies,
    numberOfCopiesLeft,
  }) => {
    try {
      const book = await db.bookManagement.findAll({
        attributes: ['isbn13', 'isbn10', 'title'],
        where: { [Op.or]: { isbn13: ISBN, isbn10: ISBN } },
        raw: true,
      });
      if (book?.length) {
        return {
          message: 'book already exists.',
        };
      } else {
        const addBook = await db.bookManagement.create({
          isbn13: ISBN.length == 13 ? ISBN : null,
          isbn10: ISBN.length == 10 ? ISBN : null,
          title: bookTitle,
          subtitle: subtitle,
          authors: author,
          categories: genre,
          publishedYear: yearOfPublication,
          status: bookAvailabilityStatus,
          originalNumberOfCopies: originalNumberOfCopies,
          numberOfCopiesLeft: numberOfCopiesLeft,
        });
        const addBookResponse = addBook.toJSON();
        return {
          message: 'book added successfully',
        };
      }
    } catch (error) {
      throw error;
    }
  },
};
