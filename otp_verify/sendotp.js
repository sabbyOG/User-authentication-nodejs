//API WHICH SEND OTP TO USER FOR AUTHENTICATION

//******SIGNUP.JS AND FORGETPASSWORD.JS WILL USE THIS SAME MODULE TO SEND OTP TO THE USER


const express = require('express');
const router = express.Router();
const {transporter} = require('../mailer/nodemailer'); //using nodemailer for sending email
const auth = require('../middleware/auth');//middleware function
const speakeasy = require('speakeasy');
const dotenv = require('dotenv');

dotenv.config({path:'./.env'});

router.post('/',auth,async(req,res)=>{

const{base32,email} = await req.user; // accessing decoded user-input that we took in signup.js file by using auth middleware function(go to auth.js)


//SPEAKEASY generating 6-digit OTP at current time(base32 must be provided for generating which we generating in signup.js file)
    const otp =  speakeasy.totp({
    secret: base32,
    encoding: 'base32'
  });

  // sender-email(your_email),receiver-email(client_email),message & OTP must be provided here in this object
  const info = {
    from: process.env.EMAIL,
    to:email,
    subject: 'USER AUTHENTICATION!!',
    text: `your 6-digit otp id ${otp}`

  };

  //sending email with OTP to client 
transporter.sendMail(info,async(error,result)=>{ //callback function for result and error

  //returns error if nodemailer can't send the email
  if(error) res.json({status:false,msg:error.message});

  else{
//return true if mail is sent succesfully
    res.json({status:true,msg:'OTP is send to your email!Please kindly check your email...'})
  }

});


});


module.exports = router;