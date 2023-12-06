const express = require('express')
const app = express()
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
const twilioRouter = require('twilio');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { console.log('Database is connected') },
).catch(err => { console.log(err) } );

// ✅ Register the bodyParser middleware here
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);



//The authentication 
app.use('/api/', authRoute);

app.listen(process.env.PORT || 5002,() => console.log(`Example app listening on port ${process.env.PORT}!`))



//app.use('/twilio-sms/', twilioRouter);
