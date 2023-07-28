const app = require('../app');
const {
  authSignUpMiddlewares, authLoginMiddlewares, bookManageCreateBookMiddlewares, bookManageDeleteBookMiddlewares, bookManageUpdateBookMiddlewares, bookManageUpdateISBNMiddlewares, bookManageListBooksMiddlewares, bookManageSearchBooksMiddlewares, bookManageBookAvailabilityMiddlewares,borrowingManageTransactBookMiddlewares,borrowingManageListBorrowedBooksMiddlewares, borrowingManageUserHistoryMiddlewares, notifManageNotifyUserMiddlewares
} = require('../Middlewares/Route-Middlewares/expressRateLimit.middleware');
const Joi = require('joi');
const {
  authenticationProcessMappers,
} = require('../../../sub-systems/authentication/Process-Mappers/processMappers');
const {
  bookManagementProcessMappers,
} = require('../../../sub-systems/book-Management/Process-Mappers/processMappers');
const {
  borrowingManagementProcessMappers,
} = require('../../../sub-systems/borrowing-Management/Process-Mappers/processMappers');
const {
  notificationManagementProcessMappers,
} = require('../../../sub-systems/notification-Management/Process-Mappers/processMappers');
const logger = require('../../../shared/src/configurations/logger.configurations');
const { cleanObject } = require('../../../shared/src/utilities/genricUtilities');

// API specific Rate-limiting Middleware
// ** notification-management APIs   *******************
app.get(
  '/routes/library-management-system/Sub-System/NotificationManagement/notify-user',
  notifManageNotifyUserMiddlewares.expressRateLimiterMiddleware,
  async (req, res, next) => {
    try {
      const schema = Joi.object({
        message: Joi.string().required(),
        phone_no: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
      });
  
      const validatedData = schema.validate(req.body);
      if (validatedData?.error) {
        throw {
          status: 400,
          message: 'Bad Request',
          error: validatedData?.error,
        };
      } else {
        const { message, phone_no } = validatedData.value;

        const response = await notificationManagementProcessMappers.notifyUserViaMailAndSmsUser({
          phone_no: phone_no,
          message: message,
        });
        
        logger.info("🚀 ~ file: microserviceRouters.js: ~ response:", response);
        res.json({
          response: response,
        });
      }
     } catch (error) {
      logger.error('This is an error message.');
      res.status(400).json({ error: error });
    }
  }
);

// ** borrowing-management APIs   *******************

app.get(
  '/routes/library-management-system/Sub-System/BorrowingManagement/user-specific-history',
  borrowingManageUserHistoryMiddlewares.expressRateLimiterMiddleware,
  async (req, res, next) => {
    try {
      const phoneNo = req?.query?.phoneNo;
      let filter = req?.query?.filter;
  
      let filterCleaned = {};
      if (filter && Object.keys(filter).length) {
        filter = JSON.parse(filter.replace(/([a-zA-Z0-9]+?):/g, '"$1":'));
        filterCleaned = cleanObject(filter);
      }

        const response = await borrowingManagementProcessMappers.getUserBorrowHistory({
          phoneNo: phoneNo,
          filterCleaned: filterCleaned,
        });
        
        logger.info("🚀 ~ file: microserviceRouters.js: ~ response:", response);
        res.json({
          response: response,
        });
     } catch (error) {
      logger.error('This is an error message.');
      res.status(400).json({ error: error });
    }
  }
);
app.get(
  '/routes/library-management-system/Sub-System/BorrowingManagement/list/all-borrowed-books',
  borrowingManageListBorrowedBooksMiddlewares.expressRateLimiterMiddleware,
  async (req, res, next) => {
    try {
      let filter = req?.query?.filter;

      let filterCleaned = {};
      if (filter && Object.keys(filter).length) {
        filter = JSON.parse(filter.replace(/([a-zA-Z0-9]+?):/g, '"$1":'));
        filterCleaned = cleanObject(filter);
      }

        const response = await borrowingManagementProcessMappers.getBorrowedBooksWithUserInfo({
          filterCleaned: filterCleaned,
        });
        
        logger.info("🚀 ~ file: microserviceRouters.js: ~ response:", response);
        res.json({
          response: response,
        });
     } catch (error) {
      logger.error('This is an error message.');

      res.status(400).json({ error: error });
    }
  }
);

app.post(
  '/routes/library-management-system/Sub-System/BorrowingManagement/transact-book/:borrowOrReturn',
  borrowingManageTransactBookMiddlewares.expressRateLimiterMiddleware,
  async (req, res, next) => {
    try {
      const schema = Joi.object({
        bookISBN: Joi.string()
          .pattern(/^(?:(?:\d{9}[X\d])|(?:\d{13}))$/)
          .required(),
        contactNumber: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
      });
      const borrowOrReturn = req?.params?.borrowOrReturn;
  
      const validatedData = schema.validate(req.body);
      if (validatedData?.error) {
        throw {
          status: 400,
          message: 'Bad Request',
          error: validatedData?.error,
        };
      } else {
        const { bookISBN, contactNumber } = validatedData.value;

        const response = await borrowingManagementProcessMappers.transactBook({
          bookISBN: bookISBN,
          contactNumber: contactNumber,
          borrowOrReturn: borrowOrReturn,
        });
        
        logger.info("🚀 ~ file: microserviceRouters.js: ~ response:", response);
        res.json({
          response: response,
        });
      }
    } catch (error) {
      logger.error('This is an error message.');

      res.status(400).json({ error: error });
    }
  }
);



// ** book-management APIs   *******************

app.get(
  '/routes/library-management-system/Sub-System/BookManagement/book-availability',
  bookManageBookAvailabilityMiddlewares.expressRateLimiterMiddleware,
  async (req, res, next) => {
    try {
      const schema = Joi.object({
        ISBN: Joi.string()
          .pattern(/^(?:(?:\d{9}[X\d])|(?:\d{13}))$/)
          .required(),
      });
      const ISBN = req?.query.ISBN;
      const validatedData = schema.validate({ ISBN: ISBN });
      if (validatedData?.error) {
        throw {
          status: 400,
          message: 'Bad Request',
          error: validatedData?.error,
        };
      } else {
        const { ISBN } = validatedData.value;

        const response = await bookManagementProcessMappers.bookAvailability({
          ISBN: ISBN,
        });
        
        logger.info("🚀 ~ file: microserviceRouters.js: ~ response:", response);
        res.json({
          response: response,
        });
      }
    } catch (error) {
      logger.error('This is an error message.');

      res.status(400).json({ error: error });
    }
  }
);

app.get(
  '/routes/library-management-system/Sub-System/BookManagement/search-books',
  bookManageSearchBooksMiddlewares.expressRateLimiterMiddleware,
  async (req, res, next) => {
    try {
      const schema = Joi.object({
        numberOfRecordsPerPage: Joi.number().integer().min(1).max(100),
        numberOfPagesToBeSkipped: Joi.number().integer().min(0),
        bookTitle: Joi.string().trim().min(1).max(255),
      });
      const numberOfRecordsPerPage =
        req?.query.numberOfRecordsPerPage;
      const numberOfPagesToBeSkipped =
        req?.query.numberOfPagesToBeSkipped;
      const bookTitle = req?.query.bookTitle;
      let filter = req?.query.filter;
  
      //     In the regular expression used in the replace() method, $1 is a reference to the first matched capturing group in the regular expression pattern.
  
      // In this case, the regular expression ([a-zA-Z0-9]+?): matches any sequence of one or more letters or digits followed by a colon, and captures the sequence of letters or digits before the colon as a group. This group is referenced using $1 in the replacement string.
  
      // By wrapping the keys in quotes in the replacement string, we ensure that the resulting string is in a valid JSON format, since JSON requires object keys to be enclosed in double quotes.
  
      // So in short, $1 in this context refers to the captured sequence of letters or digits before the colon in the regular expression pattern.
      let filterCleaned = {};
      if (filter && Object.keys(filter).length) {
        filter = JSON.parse(filter.replace(/([a-zA-Z0-9]+?):/g, '"$1":'));
        filterCleaned = cleanObject(filter);
      }
  
      const validatedData = schema.validate({
        numberOfRecordsPerPage: numberOfRecordsPerPage,
        numberOfPagesToBeSkipped: numberOfPagesToBeSkipped,
        bookTitle: bookTitle,
      });
      if (validatedData?.error) {
        throw {
          status: 400,
          message: 'Bad Request',
          error: validatedData?.error,
        };
      } else {
        const { numberOfRecordsPerPage, numberOfPagesToBeSkipped, bookTitle } =
          validatedData.value;

        const response = await bookManagementProcessMappers.searchBooks({
          numberOfRecordsPerPage: numberOfRecordsPerPage,
          numberOfPagesToBeSkipped: numberOfPagesToBeSkipped,
          bookTitle: bookTitle,
          filter: filterCleaned,
        });
        
        logger.info("🚀 ~ file: microserviceRouters.js: ~ response:", response);
        res.json({
          response: response,
        });
      }
    } catch (error) {
      logger.error('This is an error message.');

      res.status(400).json({ error: error });
    }
  }
);

app.get(
  '/routes/library-management-system/Sub-System/BookManagement/list-books',
  bookManageListBooksMiddlewares.expressRateLimiterMiddleware,
  async (req, res, next) => {
      try {
        const schema = Joi.object({
          numberOfRecordsPerPage: Joi.number().integer().min(1).max(100),
          numberOfPagesToBeSkipped: Joi.number().integer().min(0),
        });
        const numberOfRecordsPerPage =
          req?.query?.numberOfRecordsPerPage;
        const numberOfPagesToBeSkipped =
          req?.query.numberOfPagesToBeSkipped;
        let filter = req?.query.filter;
    
        //     In the regular expression used in the replace() method, $1 is a reference to the first matched capturing group in the regular expression pattern.
    
        // In this case, the regular expression ([a-zA-Z0-9]+?): matches any sequence of one or more letters or digits followed by a colon, and captures the sequence of letters or digits before the colon as a group. This group is referenced using $1 in the replacement string.
    
        // By wrapping the keys in quotes in the replacement string, we ensure that the resulting string is in a valid JSON format, since JSON requires object keys to be enclosed in double quotes.
    
        // So in short, $1 in this context refers to the captured sequence of letters or digits before the colon in the regular expression pattern.
        let filterCleaned = {};
        if (filter && Object.keys(filter).length) {
          filter = JSON.parse(filter.replace(/([a-zA-Z0-9]+?):/g, '"$1":'));
          filterCleaned = cleanObject(filter);
        }
    
        const validatedData = schema.validate({
          numberOfRecordsPerPage: numberOfRecordsPerPage,
          numberOfPagesToBeSkipped: numberOfPagesToBeSkipped,
        });
        if (validatedData?.error) {
          throw {
            status: 400,
            message: 'Bad Request',
            error: validatedData?.error,
          };
        } else {
          const { numberOfRecordsPerPage, numberOfPagesToBeSkipped } =
            validatedData.value;

        const response = await bookManagementProcessMappers.listBooks({
          numberOfRecordsPerPage: numberOfRecordsPerPage,
          numberOfPagesToBeSkipped: numberOfPagesToBeSkipped,
          filter: filterCleaned,
        });
        
        logger.info("🚀 ~ file: microserviceRouters.js: ~ response:", response);
        res.json({
          response: response,
        });
      }
    } catch (error) {
      logger.error('This is an error message.');

      res.status(400).json({ error: error });
    }
  }
);


app.put(
  '/routes/library-management-system/Sub-System/BookManagement/update-ISBN:oldISBN',
  bookManageUpdateISBNMiddlewares.expressRateLimiterMiddleware,
  async (req, res, next) => {
    try {
      const schema = Joi.object({
        oldISBN: Joi.string()
          .pattern(/^(?:(?:\d{9}[X\d])|(?:\d{13}))$/)
          .required(),
        newISBN: Joi.string()
          .pattern(/^(?:(?:\d{9}[X\d])|(?:\d{13}))$/)
          .required(),
      });
      const newISBN = req?.body?.newISBN;
      const oldISBN = req?.params?.oldISBN;
      const validatedData = schema.validate({ newISBN, oldISBN });
      if (validatedData?.error) {
        throw {
          status: 400,
          message: 'Bad Request',
          error: validatedData?.error,
        };
      } else {
        const { newISBN, oldISBN } = validatedData.value;

        const response = await bookManagementProcessMappers.updateISBN({
          newISBN: newISBN,
          oldISBN: oldISBN,
        });
        
        logger.info("🚀 ~ file: microserviceRouters.js: ~ response:", response);
        res.json({
          response: response,
        });
      }
    } catch (error) {
      logger.error('This is an error message.');

      res.status(400).json({ error: error });
    }
  }
);

app.put(
  '/routes/library-management-system/Sub-System/BookManagement/update-book:ISBN',
  bookManageUpdateBookMiddlewares.expressRateLimiterMiddleware,
  async (req, res, next) => {
    try {
      const schema = Joi.object({
        ISBN: Joi.string()
          .pattern(/^(?:(?:\d{9}[X\d])|(?:\d{13}))$/)
          .required(),
        bookTitle: Joi.string().required(),
        author: Joi.string().required(),
        subtitle: Joi.string().default('No subtitle'),
        genre: Joi.string().required(),
        yearOfPublication: Joi.string().required(),
        bookAvailabilityStatus: Joi.string()
          .valid('available', 'unavailable')
          .required(),
        originalNumberOfCopies: Joi.number().integer().min(1).required(),
        numberOfCopiesLeft: Joi.number()
          .integer()
          .min(0)
          .max(Joi.ref('originalNumberOfCopies'))
          .required(),
      });
      req.body.ISBN = req?.params?.ISBN;
  
      const validatedData = schema.validate(req.body);
      if (validatedData?.error) {
        throw {
          status: 400,
          message: 'Bad Request',
          error: validatedData?.error,
        };
      } else {
        const {
          ISBN,
          bookTitle,
          author,
          subtitle,
          genre,
          yearOfPublication,
          bookAvailabilityStatus,
          originalNumberOfCopies,
          numberOfCopiesLeft,
        } = validatedData.value;
  

        const response = await bookManagementProcessMappers.updateBook({
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
        
        logger.info("🚀 ~ file: microserviceRouters.js: ~ response:", response);
        res.json({
          response: response,
        });
      }
    } catch (error) {
      logger.error('This is an error message.');

      res.status(400).json({ error: error });
    }
  }
);


app.delete(
  '/routes/library-management-system/Sub-System/BookManagement/delete-book',
  bookManageDeleteBookMiddlewares.expressRateLimiterMiddleware,
  async (req, res, next) => {
    try {
       const schema = Joi.object({
      ISBN: Joi.string()
        .pattern(/^(?:(?:\d{9}[X\d])|(?:\d{13}))$/)
        .required(),
    });

    const validatedData = schema.validate(req.body);
    if (validatedData?.error) {
      throw {
        status: 400,
        message: 'Bad Request',
        error: validatedData?.error,
      };
    } else {
      const { ISBN } = validatedData.value;

        const response = await bookManagementProcessMappers.deleteBook({
        ISBN: ISBN,
      });
        
        logger.info("🚀 ~ file: microserviceRouters.js: ~ response:", response);
        res.json({
          response: response,
        });
      }
    } catch (error) {
      logger.error('This is an error message.');

      res.status(400).json({ error: error });
    }
  }
);


app.post(
  '/routes/library-management-system/Sub-System/BookManagement/create-book',
  bookManageCreateBookMiddlewares.expressRateLimiterMiddleware,
  async (req, res, next) => {
    try {
      const schema = Joi.object({
        ISBN: Joi.string()
          .pattern(/^(?:(?:\d{9}[X\d])|(?:\d{13}))$/)
          .required(),
        bookTitle: Joi.string().required(),
        author: Joi.string().required(),
        subtitle: Joi.string().default('No subtitle'),
        genre: Joi.string().required(),
        yearOfPublication: Joi.string().required(),
        bookAvailabilityStatus: Joi.string()
          .valid('available', 'unavailable')
          .required(),
        originalNumberOfCopies: Joi.number().integer().min(1).required(),
        numberOfCopiesLeft: Joi.number()
          .integer()
          .min(0)
          .max(Joi.ref('originalNumberOfCopies'))
          .required(),
      });
  
      const validatedData = schema.validate(req.body);
      if (validatedData?.error) {
        throw {
          status: 400,
          message: 'Bad Request',
          error: validatedData?.error,
        };
      } else {
        const {
          ISBN,
          bookTitle,
          author,
          subtitle,
          genre,
          yearOfPublication,
          bookAvailabilityStatus,
          originalNumberOfCopies,
          numberOfCopiesLeft,
        } = validatedData.value;

        const response = await bookManagementProcessMappers.createBook({
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
        
        logger.info("🚀 ~ file: microserviceRouters.js: ~ response:", response);
        res.json({
          response: response,
        });
      }
    } catch (error) {
      logger.error('This is an error message.');

      res.status(400).json({ error: error });
    }
  }
);

// ** Authentication APIs   *******************

app.post(
  '/routes/library-management-system/Sub-System/Authentication/user-authentication/login',
  authLoginMiddlewares.expressRateLimiterMiddleware,
  async (req, res, next) => {
    try {
      const schema = Joi.object({
        phoneNo: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
        password: Joi.string().min(8).max(30).required(),
      });
      const validatedData = schema.validate(req.body);
      if (validatedData?.error) {
        throw {
          status: 400,
          message: 'Bad Request',
          error: validatedData?.error,
        };
      } else {
        const { phoneNo, password } = validatedData.value;
        const response = await authenticationProcessMappers.loginUser({
          phoneNo: phoneNo,
          password: password,
        });
        
        logger.info("🚀 ~ file: microserviceRouters.js: ~ response:", response);
        res.json({
          response: response,
        });
      }
    } catch (error) {
      logger.error('This is an error message.');

      res.status(400).json({ error: error });
    }
  }
);
app.post(
  '/routes/library-management-system/Sub-System/Authentication/user-authentication/sign-up',
  authSignUpMiddlewares.expressRateLimiterMiddleware,
  async (req, res, next) => {
    try {
      const schema = Joi.object({
        firstName: Joi.string().min(2).max(30).required(),
        lastName: Joi.string().min(2).max(30).default(''),
        email: Joi.string().email().required(),
        gender: Joi.string()
          .valid('male', 'female', 'other', 'prefer not to say')
          .required(),
        city: Joi.string().required(),
        password: Joi.string().min(8).max(30).required(),
        phoneNo: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
        state: Joi.string().min(2).max(20).required(),
        country: Joi.string().min(2).max(20).required(),
      });
      const validatedData = schema.validate(req.body);
      if (validatedData?.error) {
        throw {
          status: 400,
          message: 'Bad Request',
          error: validatedData?.error,
        };
      } else {
        const {
          firstName,
          lastName,
          email,
          gender,
          city,
          password,
          phoneNo,
          state,
          country,
        } = validatedData.value;
        const response = await authenticationProcessMappers.createNewUser({
          firstName: firstName,
          lastName: lastName,
          email: email,
          gender: gender,
          city: city,
          password: password,
          phoneNo: phoneNo,
          state: state,
          country: country,
        });
        
        logger.info("🚀 ~ file: microserviceRouters.js: ~ response:", response);
        res.json({
          response: response,
        });
      }
    } catch (error) {
      logger.error('This is an error message.');

      res.status(400).json({ error: error });
    }
  }
);



app.listen(3000, () => {
  console.log('listening on port 3000');
});
