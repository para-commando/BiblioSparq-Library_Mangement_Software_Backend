const {notificationManagementProcesses} = require('../Processes/process');
const logger = require ('../../../shared/src/configurations/logger.configurations')
module.exports.notificationManagementProcessMappers = {
  notifyAllUsers : async ({ message }) => {
    try {
      const response = await notificationManagementProcesses.notifyAllUsers({
        message: message,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
    notifyUserViaMailAndSmsUser: async ({ message, phone_no }) => {
        try {
          const response = await notificationManagementProcesses.notifyUserViaMailAndSmsUser({
            phone_no: phone_no,
            message: message,
          });
          return response;
        } catch (error) {
          throw error;
        }
      },
}
