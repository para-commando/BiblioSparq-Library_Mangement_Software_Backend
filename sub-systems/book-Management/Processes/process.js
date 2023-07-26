const logger = require('../../../shared/src/configurations/logger.configurations');
const db = require('../../../shared/src/models/index');
const { Op } = require('sequelize');
module.exports.bookManagementProcesses = {
  listBooks: async ({
    numberOfRecordsPerPage,
    numberOfPagesToBeSkipped,
    filter,
  }) => {
    try {
      let filterObject = {};
      filterObject = {
        ...filter,
      };
      let booksFound;
      let filterWithDbColumnMappedKeys = {};

      for (const [key, value] of Object.entries(filterObject)) {
        if (book_management_column_Mapping?.[key]) {
          filterWithDbColumnMappedKeys[book_management_column_Mapping[key]] =
            value;
        }
      }

      const offsetValue =
        numberOfPagesToBeSkipped * numberOfRecordsPerPage -
        numberOfRecordsPerPage;
      if (Object.keys(filterWithDbColumnMappedKeys).length) {
        booksFound = await db.bookManagement.findAll({
          attributes: [
            'isbn13',
            'isbn10',
            'title',
            'subtitle',
            'authors',
            'categories',
            'publishedYear',
            'status',
            'originalNumberOfCopies',
            'numberOfCopiesLeft',
          ],
          where: filterWithDbColumnMappedKeys,
          limit: numberOfRecordsPerPage,
          offset: offsetValue,
          raw: true,
        });
      } else {
        booksFound = await db.bookManagement.findAll({
          attributes: [
            'isbn13',
            'isbn10',
            'title',
            'subtitle',
            'authors',
            'categories',
            'publishedYear',
            'status',
            'originalNumberOfCopies',
            'numberOfCopiesLeft',
          ],
          limit: numberOfRecordsPerPage,
          offset: offsetValue,
          raw: true,
        });
      }
      if (booksFound && booksFound.length) {
        return {
          books: booksFound,
        };
      } else {
        return {
          message: 'Invalid book data or book does not exist in database.',
        };
      }
    } catch (error) {
       throw error;
    }
  } ,
  updateISBN: async ({ oldISBN, newISBN }) => {
    try {
      const getAttributes = {};
      getAttributes[Object.keys(newISBN)[0]] = newISBN[Object.keys(newISBN)[0]];

      const [upatedBookRecords] = await db.bookManagement.update(
        getAttributes,
        { where: { [Op.or]: { isbn13: oldISBN, isbn10: oldISBN } } }
      );
      if (upatedBookRecords >= 1) {
        return {
          message: 'Book updated successfully',
        };
      } else {
        return {
          message:
            'Failed to update book,Invalid ISBN or book does not exist in database.',
        };
      }
    } catch (error) {
       throw error;
    }
  },
  updateBook: async ({
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
        attributes: [
          'isbn13',
          'isbn10',
          'title',
          'subtitle',
          'authors',
          'categories',
          'publishedYear',
          'status',
          'originalNumberOfCopies',
          'numberOfCopiesLeft',
        ],
        where: { [Op.or]: { isbn13: ISBN, isbn10: ISBN } },
        raw: true,
      });
      if (book?.length) {
        const [upatedBookRecords] = await db.bookManagement.update(
          {
            title: bookTitle,
            subtitle: subtitle,
            authors: author,
            categories: genre,
            publishedYear: yearOfPublication,
            status: bookAvailabilityStatus,
            originalNumberOfCopies: originalNumberOfCopies,
            numberOfCopiesLeft: numberOfCopiesLeft,
          },
          { where: { [Op.or]: { isbn13: ISBN, isbn10: ISBN } } }
        );
        if (upatedBookRecords >= 1) {
          return {
            message: 'Book updated successfully',
          };
        } else {
          return {
            message: 'Failed to update book',
          };
        }
      } else {
        return {
          message: 'Invalid ISBN or book does not exist in database.',
        };
      }
    } catch (error) {
       throw error;
    }
  },
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
