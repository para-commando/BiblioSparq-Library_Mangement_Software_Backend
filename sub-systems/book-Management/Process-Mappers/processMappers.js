const {bookManagementProcesses} = require('../Processes/process');
const logger = require ('../../../shared/src/configurations/logger.configurations')
module.exports.bookManagementProcessMappers = {
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
