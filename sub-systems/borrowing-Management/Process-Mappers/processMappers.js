const {processes} = require('../Processes/process');
const logger = require ('../../../shared/src/configurations/logger.configurations')
const {borrowingManagementProcesses} = require('../Processes/process');

module.exports.borrowingManagementProcessMappers = {
    transactBook : async ({
        bookISBN,
        contactNumber,
        borrowOrReturn,
      }) => {
        try {
          let isbnValue = {};
          if (bookISBN.length == 10) {
            isbnValue.isbn10 = bookISBN;
          } else if (bookISBN.length == 13) {
            isbnValue.isbn13 = bookISBN;
          }
          const response = await borrowingManagementProcesses.transactBook({
            bookISBN: isbnValue,
            contactNumber: contactNumber,
            borrowOrReturn: borrowOrReturn,
          });
          return response;
        } catch (error) {
           
          throw error;
        }
      }
}
