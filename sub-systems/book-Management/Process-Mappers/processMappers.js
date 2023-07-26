const {bookManagementProcesses} = require('../Processes/process');
const logger = require ('../../../shared/src/configurations/logger.configurations')
const {
  getPropertiesWithValidValues,
  getDateFilterValuesForYearOfPublication,
  getDateFilterValuesForBooKAddedDate,
} = require('../../../shared/src/utilities/');
module.exports.bookManagementProcessMappers = {
  bookAvailability : async ({ ISBN }) => {
    try {
      const response = await bookManagementProcesses.bookAvailability({
        ISBN: ISBN,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  searchBooks : async ({
    numberOfRecordsPerPage,
    numberOfPagesToBeSkipped,
    bookTitle,
    filter,
  }) => {
    try {
      let holdISBN;
      if (filter?.ISBN?.length == 10) {
        holdISBN = filter.ISBN;
        delete filter.ISBN;
        filter.ISBN10 = holdISBN;
      } else if (filter?.ISBN?.length == 13) {
        holdISBN = filter.ISBN;
        delete filter.ISBN;
        filter.ISBN13 = holdISBN;
      }
      if (filter.hasOwnProperty('yearOfPublication')) {
        filter.yearOfPublication = getPropertiesWithValidValues(
          filter.yearOfPublication
        );
        // array destructing to extract the concerned key
        const [filterCondition, ...rest] = Object.keys(filter.yearOfPublication);
        filter.yearOfPublication = getDateFilterValuesForYearOfPublication({
          key: filterCondition,
          startYear: filter.yearOfPublication[filterCondition][0],
          endYear: filter.yearOfPublication[filterCondition][1],
        });
      }
      if (filter.hasOwnProperty('bookAddedDate')) {
        filter.bookAddedDate = getPropertiesWithValidValues(filter.bookAddedDate);
        const [filterCondition, ...rest] = Object.keys(filter.bookAddedDate);
        filter.bookAddedDate = getDateFilterValuesForBooKAddedDate({
          key: filterCondition,
          startYear: filter.bookAddedDate[filterCondition][0],
          endYear: filter.bookAddedDate[filterCondition][1],
        });
      }
  
      const response = await bookManagementProcesses.searchBooks({
        numberOfRecordsPerPage: numberOfRecordsPerPage,
        numberOfPagesToBeSkipped: numberOfPagesToBeSkipped,
        bookTitle: bookTitle,
        filter: filter,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  listBooks : async ({
    numberOfRecordsPerPage,
    numberOfPagesToBeSkipped,
    filter,
  }) => {
    try {
      let holdISBN;
      if (filter?.ISBN?.length == 10) {
        holdISBN = filter.ISBN;
        delete filter.ISBN;
        filter.ISBN10 = holdISBN;
      } else if (filter?.ISBN?.length == 13) {
        holdISBN = filter.ISBN;
        delete filter.ISBN;
        filter.ISBN13 = holdISBN;
      }
      if (filter.hasOwnProperty('yearOfPublication')) {
        filter.yearOfPublication = getPropertiesWithValidValues(
          filter.yearOfPublication
        );
        // array destructing to extract the concerned key
        const [filterCondition, ...rest] = Object.keys(filter.yearOfPublication);
        filter.yearOfPublication = getDateFilterValuesForYearOfPublication({
          key: filterCondition,
          startYear: filter.yearOfPublication[filterCondition][0],
          endYear: filter.yearOfPublication[filterCondition][1],
        });
      }
      if (filter.hasOwnProperty('bookAddedDate')) {
        filter.bookAddedDate = getPropertiesWithValidValues(filter.bookAddedDate);
        const [filterCondition, ...rest] = Object.keys(filter.bookAddedDate);
        filter.bookAddedDate = getDateFilterValuesForBooKAddedDate({
          key: filterCondition,
          startYear: filter.bookAddedDate[filterCondition][0],
          endYear: filter.bookAddedDate[filterCondition][1],
        });
      }
  
      const response = await bookManagementProcesses.listBooks({
        numberOfRecordsPerPage: numberOfRecordsPerPage,
        numberOfPagesToBeSkipped: numberOfPagesToBeSkipped,
        filter: filter,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
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
