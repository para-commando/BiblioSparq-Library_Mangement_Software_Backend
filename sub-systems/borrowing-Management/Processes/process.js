const logger = require ('../../../shared/src/configurations/logger.configurations')
const db = require('../../../shared/src/models/index');
const { Op } = require('sequelize');

module.exports.borrowingManagementProcesses = {
    transactBook: async ({ bookISBN, contactNumber, borrowOrReturn }) => {
        try {
          const getAttributes = [];
          getAttributes.push([Object.keys(bookISBN)[0], 'isbn']);
          getAttributes.push(['id', 'book_id']);
          getAttributes.push('status');
          const ISBN = bookISBN[Object.keys(bookISBN)[0]];
          const isBookToBeReservedPresent = await db.bookManagement.findOne({
            attributes: getAttributes,
            where: { [Op.or]: { isbn13: ISBN, isbn10: ISBN } },
            raw: true,
          });
         
          const isUserToReserveBookExists = await db.signUp.findOne({
            attributes: [['id', 'user_id']],
            where: { phone_no: contactNumber },
            raw: true,
          });
    
          // const userToReserveBook = await db.signUp.findOne({
          //   attributes: [['id', 'user_id']],
          //   where: { phone_no: contactNumber },
          //   raw: true,
          //   defaults: { user_id: null } // Set default value for user_id attribute
          // });
          const todaysDate = new Date().toISOString();
    
          if (isBookToBeReservedPresent && isUserToReserveBookExists) {
            if (borrowOrReturn === 'borrow') {
              if (isBookToBeReservedPresent.status === 'available') {
                const bookRentDuration = 14;
                const rentStartPostBorrow = 1;
                const today = new Date(); // get current date
                const rentStartsFrom = new Date(
                  today.getTime() + rentStartPostBorrow * 24 * 60 * 60 * 1000
                ); // add 10 days to current date
                rentStartsFrom.setHours(0, 0, 0, 0);
                const dueDate = new Date(
                  today.getTime() +
                    (bookRentDuration + rentStartPostBorrow) * 24 * 60 * 60 * 1000
                ); // add 10 days to current date
                dueDate.setHours(23, 59, 59, 0);
               
    
                const reserveBook = await db.borrowingManagement.create({
                  user_id: isUserToReserveBookExists.user_id,
                  book_id: isBookToBeReservedPresent.book_id,
                  book_isbn: isBookToBeReservedPresent.isbn,
                  borrowed_date: rentStartsFrom,
                  due_date: dueDate,
                });
                const updateNumberOfBooks = await db.bookManagement.update(
                  {
                    numberOfCopiesLeft: db.sequelize.literal(
                      'CASE WHEN "numberOfCopiesLeft" > 1 THEN "numberOfCopiesLeft" - 1 ELSE 0 END'
                    ),
                    status: db.sequelize.literal(
                      `CASE WHEN "numberOfCopiesLeft" > 1 THEN status ELSE 'issued' END`
                    ),
                  },
                  {
                    where: {
                      id: isBookToBeReservedPresent.book_id,
                      numberOfCopiesLeft: { [Op.gt]: 0 },
                    },
                  }
                );
                
    
                return reserveBook?.dataValues && updateNumberOfBooks
                  ? { message: 'Book reserved successfully' }
                  : { message: 'Failed to reserve book' };
              } else {
                return {
                  message: 'All the copies have been issued.',
                };
              }
            } else if (borrowOrReturn === 'return') {
              const isBookReserved = await db.borrowingManagement.findAll({
                attributes: ['user_id', 'book_id', 'book_isbn'],
                where: {
                  [Op.and]: {
                    user_id: isUserToReserveBookExists.user_id,
                    book_id: isBookToBeReservedPresent.book_id,
                    returned_date: null,
                  },
                },
                raw: true,
              });
              // for the books which have not been returned, returned_date will be null
               
              if (isBookReserved && isBookReserved?.length) {
                const numberOfRowsDeleted = await db.borrowingManagement.update(
                  {
                    returned_date: todaysDate,
                  },
                  {
                    where: {
                      [Op.and]: {
                        user_id: isUserToReserveBookExists.user_id,
                        book_id: isBookToBeReservedPresent.book_id,
                      },
                    },
                  }
                );
                
                const updateNumberOfBooks = await db.bookManagement.update(
                  {
                    status: db.sequelize.literal(
                      `CASE WHEN "numberOfCopiesLeft" = 0 THEN 'available' ELSE status END`
                    ),
                    numberOfCopiesLeft: db.sequelize.literal(
                      '"numberOfCopiesLeft" + 1'
                    ),
                  },
                  { where: { id: isBookToBeReservedPresent.book_id } }
                );
               
                return numberOfRowsDeleted && updateNumberOfBooks
                  ? {
                      message: 'Book returned successfully',
                    }
                  : {
                      message: 'failed to return book',
                    };
              } else {
                return {
                  message: 'Book not reserved',
                };
              }
            }
          } else {
            return {
              message:
                'Failed to reserve the book,Invalid ISBN or user data does not exist.',
            };
          }
        } catch (error) {
          
          throw error;
        }
      },
}
