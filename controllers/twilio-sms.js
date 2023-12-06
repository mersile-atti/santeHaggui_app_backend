const dotenv = require('dotenv');

dotenv.config();


const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendOTP = async (req, res, next) => {
    //const { countryCode, phoneNumber } = req.body;
    //`+${countryCode}${phoneNumber}`
    //`+${countryCode}${phoneNumber}`
  
    try {
      const otpResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: "+33784626126",
        channel: 'sms',
      });
  
      res.status(200).send(`OTP sent successfully!: ${JSON.stringify(otpResponse)}`);
    } catch (error) {
      res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
    }
  };
  
  const verifyOTP = async (req, res, next) => {
    const { countryCode, phoneNumber, otp } = req.body;
  
    try {
      const otpResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: "33784626126",
        code: otp,
      });
  
      res.status(200).send(`OTP verified successfully!: ${JSON.stringify(otpResponse)}`);
    } catch (error) {
      res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
    }
  };

  module.exports = { sendOTP, verifyOTP };