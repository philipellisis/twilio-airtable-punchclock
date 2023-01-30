const axios = require('axios');

exports.handler = async (context, event, callback) => {
    // Create a new messaging response object
    const message = event.Body.toLowerCase();
    const phoneNumber = event.From || event.phoneNumber || '+14405273672';
    const apiKey = context.API_KEY

    const twiml = new Twilio.twiml.MessagingResponse();

    try {
        var data = JSON.stringify({
            "records": [
              {
                "fields": {
                  "Phone Number": phoneNumber,
                  "Punch": message
                }
              }
            ]
          });

          var config = {
            method: 'post',
            url: 'https://api.airtable.com/v0/appIYujosS9RbtTtl/Timesheet',
            headers: { 
              'Authorization': 'Bearer ' + apiKey, 
              'Content-Type': 'application/json'
            },
            data : data
          };
        if (message === 'in' || message === 'out') {
            const response = await axios(config);
            twiml.message("succesfully punched the clock");
        } else {
            twiml.message("not sure what you wanted to do");
        }
        return callback(null, twiml);
        
    } catch (error) {
        return callback(error);
    }
    
  };