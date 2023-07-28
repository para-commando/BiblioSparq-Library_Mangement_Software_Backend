// Mailing service
require('dotenv').config();

const sendInBlueMailingPackage = require('sib-api-v3-sdk');
const sendInBlueMailingClient = sendInBlueMailingPackage.ApiClient.instance;

// Configure API key authorization: api-key
const sendInBlueAuthenticationConfig = sendInBlueMailingClient.authentications['api-key'];
sendInBlueAuthenticationConfig.apiKey = process.env.SEND_IN_BLUE_API_KEY;

const SendInBlueApiInstance = new sendInBlueMailingPackage.TransactionalEmailsApi();

module.exports = {SendInBlueApiInstance}