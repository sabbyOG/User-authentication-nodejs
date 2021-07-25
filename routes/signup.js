// API FOR SINGUP OR API WHICH TAKES USER DATA FOR SIGNUP

const express = require('express');
const router = express.Router();
const speakeasy = require('speakeasy');  //using speakeasy for generating for OTP
const jwt = require('jsonwebtoken'); // using jwt for jsonwebtoken
const dotenv = require('dotenv'); //dotenv for hiding credentials
const { db } = require('../mysql/db'); //mysql 
const Joi = require('joi'); // using JOI for user data-validating

dotenv.config({path:'./.env'});

// validating User data through JOI npm package
const schema = Joi.object({
    name:Joi.string().min(4).max(30).required(),
    email:Joi.string().min(8).max(40).required(),
    phone:Joi.string().min(10).required(),
    password:Joi.string().min(8).max(24).required(),
    confirmPassword:Joi.string().min(8).max(24).required(),
});  

router.post('/',async(req,res)=>{

  const {name,email,phone,password,confirmPassword} = await req.body; //taking user-input

    const {error} = schema.validate({name,email,phone,password,confirmPassword}); // validating user data here)
    if (error) return res.json({status:false,msg:error.message}); // returns error if user-input is invalid


    //mysql query for selecting email from database
 db.query('SELECT `email` FROM `Users` WHERE `email` = ?',[email], async (error, result) => {

    if (error) return res.json({ status: false, msg: error.sqlMessage });//return mysql error if anything wrong occurs

    //if email already exists in database it will return false
    if (result.length > 0) {
      res.json({ status: false, msg: "email already exists.." });

    }

    //if password & confirm password doesnt match returns false
    if (password != confirmPassword) {
      res.json({ status: false, msg: "password n confirm password doesnt match" });

    }
  if(!result.length > 0){

    const secret = speakeasy.generateSecret(); //generating base32 based secret-key here
    const base32 = secret.base32; //only selecting base32 key


    //encrypting user-data & base32 key (for generatind OTP in future) with jsonwebtoken
    const token = jwt.sign({name,email,phone,password,base32}, process.env.JWT_SECRET, { expiresIn: 2 * 60 * 1000 });

    //sending to header
    res.header('x-auth-token', token);
    res.json({ status: true, msg: "OTP will be sent to your email id please kindly check it" });


    }


  });



});


module.exports = router;
