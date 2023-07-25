const {bookManagementProcesses} = require('../Processes/process');
const logger = require ('../../../shared/src/configurations/logger.configurations')
module.exports.bookManagementProcessMappers = {
  updateISBN: async ({ oldISBN, newISBN }) => {
    let isbnValue = {};
    if (newISBN.length == 10) {
      isbnValue.isbn10 = newISBN;
    } else if (newISBN.length == 13) {
      isbnValue.isbn13 = newISBN;
    }
    try {
      const response = await bookManagementProcesses.updateISBN({ newISBN: isbnValue, oldISBN: oldISBN });
      return response;
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
      const response = await bookManagementProcesses.updateBook({
        ISBN: ISBN,
        bookTitle: bookTitle,
        author: author,
        genre: genre,
        subtitle: subtitle,
        yearOfPublication: yearOfPublication,
        bookAvailabilityStatus: bookAvailabilityStatus,
        originalNumberOfCopies: originalNumberOfCopies,
        numberOfCopiesLeft: numberOfCopiesLeft,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteBook: async ({ ISBN }) => {
    try {
      const response = await bookManagementProcesses.deleteBook({
        ISBN: ISBN,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
    createBook:async ({
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
          const response = await bookManagementProcesses.createBook({
            ISBN: ISBN,
            bookTitle: bookTitle,
            author: author,
            genre: genre,
            subtitle: subtitle,
            yearOfPublication: yearOfPublication,
            bookAvailabilityStatus: bookAvailabilityStatus,
            originalNumberOfCopies: originalNumberOfCopies,
            numberOfCopiesLeft: numberOfCopiesLeft,
          });
          return response;
        } catch (error) {
          throw error;
        }
      },
}
