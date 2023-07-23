const {authenticationProcesses} = require('../Processes/process');
const logger = require ('../../../shared/src/configurations/logger.configurations')
module.exports.authenticationProcessMappers = {
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
          const response = await authenticationProcesses.createNewUser({
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
          return response;
        } catch (error) {
          throw error;
        }
}
}
