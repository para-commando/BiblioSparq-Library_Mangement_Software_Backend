const {notificationManagementProcesses} = require('../Processes/process');
const logger = require ('../../../shared/src/configurations/logger.configurations')
module.exports.notificationManagementProcessMappers = {
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
