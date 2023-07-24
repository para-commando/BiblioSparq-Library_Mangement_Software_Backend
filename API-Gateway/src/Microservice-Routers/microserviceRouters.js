const app = require('../app');
const {
  authSignUpMiddlewares, authLoginMiddlewares
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
// API specific Rate-limiting Middleware
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
        
        logger.info("🚀 ~ file: microserviceRouters.js:31 ~ response:", response);
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
        
        logger.info("🚀 ~ file: microserviceRouters.js:31 ~ response:", response);
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
