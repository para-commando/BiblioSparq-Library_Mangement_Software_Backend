const logger = require ('../../../shared/src/configurations/logger.configurations')
const db = require('../../../shared/src/models/index');
const { Op } = require('sequelize');
const { SendInBlueApiInstance,} = require('../../../shared/src/thirdPartyServices/sendInBlue.services');
const { twilioSmsClient } = require('../../../shared/src/thirdPartyServices/twilio.services');
module.exports.notificationManagementProcesses = {
    notifyUserViaMailAndSmsUser: async ({ phone_no, message }) => {
        try {
          const getUserData = await db.signUp.findOne({
            attributes: ['phone_no', 'email', 'first_name', 'last_name'],
            raw: true,
            where: {
              phone_no: {
                [Op.eq]: phone_no,
              },
            },
          });
    
          const sendSmtpEmail = {
            subject: 'Hello from Sendinblue',
            textContent: 'Hi there! This is a test email.',
            sender: { name: 'John Doe', email: 'john@doe.com' },
            to: [{ email: 'nayakanirudh2000@gmail.com', name: 'General Bukki' }],
          };
          const temporaryPhoneNumbers = [getUserData.phone_no];
          const messagesSent = [];
          const mailsSent = [];
          if (temporaryPhoneNumbers?.length) {
            for (let i = 0; i < temporaryPhoneNumbers.length; i++) {
              const twilioResponse = await twilioSmsClient.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: `+91${temporaryPhoneNumbers[i]}`,
              });
    
              if (twilioResponse?.accountSid === process.env.TWILIO_ACCOUNT_SID) {
                messagesSent.push(`${temporaryPhoneNumbers[i]}`);
              }
    
              sendSmtpEmail.to[0].email = getUserData.email;
              sendSmtpEmail.to[0].name =
                getUserData.first_name + getUserData.last_name;
              sendSmtpEmail.textContent = message;
    
              const data = await SendInBlueApiInstance.sendTransacEmail(
                sendSmtpEmail
              );
    
              if (data?.messageId) {
                mailsSent.push(getUserData.email);
              }
            }
            return {
              successfullyMessagedNumbers: messagesSent,
              successfullyMailedEmailIds: mailsSent,
            };
          } else {
            return {
              message: 'User not found',
            };
          }
        } catch (error) {
           throw error;
        }
      },
}
