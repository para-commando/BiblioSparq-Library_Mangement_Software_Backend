const logger = require ('../../../shared/src/configurations/logger.configurations')
const bcrypt = require('bcryptjs');
const db = require('../../../shared/src/models/index');
const { Op } = require('sequelize');
require('dotenv').config();

module.exports.authenticationProcesses = {
    createNewUser: async ({
        firstName,
        lastName,
        email,
        gender,
        city,
        password,
        phoneNo,
        state,
        country,
      }) => {
        try {
          const user = await db.signUp.findAll({
            attributes: [
              'first_name',
              'last_name',
              'email',
              'password',
              'phone_no',
            ],
            where: {
              [Op.or]: [{ email: email }, { phone_no: phoneNo }],
            },
            raw: true,
          });
    
          if (user.length) {
            return {
              message: 'user already exists, please try login instead.',
            };
          } else {
            const hashedPassword = bcrypt.hashSync(
              password,
              Number(process.env.HASHING_ROUNDS)
            );
            const createNewUser = await db.signUp.create({
              first_name: firstName,
              last_name: lastName,
              email: email,
              gender: gender,
              city: city,
              password: hashedPassword,
              phone_no: phoneNo,
              state: state,
              country: country,
            });
            const createOperationResponse = createNewUser.toJSON();
            return {
              message: 'Account created successfully, you are now logged in.',
            };
          }
        } catch (error) {
          throw error;
        }
      },
}
