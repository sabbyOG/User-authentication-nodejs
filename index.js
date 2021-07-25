const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());


// NOTE :: SIGNUP.JS AND FORGETPASSWORD USE SAME API OR MODULE FOR SENDING OTP TO USER(sendotp.js or http://localhost:5000/api/sendotp)

app.use('/db',require('./mysql/db'));
app.use('/api/signup',require('./routes/signup'));
app.use('/api/sendotp',require('./otp_verify/sendotp'));
app.use('/api/verifyUser',require('./otp_verify/verifyUser'));
app.use('/api/saveUser',require('./routes/saveUser'));
app.use('/api/login',require('./routes/login'));
app.use('/api/forgetpass',require('./routes/forgetPassword'));
app.use('/api/changepass',require('./routes/changePassword'));




app.listen(port,()=>console.log(`Listening to port ${port}`));