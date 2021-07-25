//API IF USER FORGETS ITS PASSWORD

const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const Joi = require('joi');
const { db } = require('../mysql/db');
const speakeasy = require('speakeasy');
const jwt = require('jsonwebtoken'); // using jwt for jsonwebtoken

dotenv.config({path:'./.env'});

// validating User data through JOI npm package
const schema = Joi.object({
    email:Joi.string().min(8).max(40).required()  
});  

router.post('/',async(req,res)=>{

    const {email}  = await req.body;

    const {error} = schema.validate({email});
    if(error) return res.json({status:false,msg:error.message});

    db.query('SELECT *FROM `Users` WHERE `email`= ?',[email],async(error,results)=>{
        if(error) return res.json({status:false,msg:error.sqlMessage});
        if (results.length > 0){
            const secret = speakeasy.generateSecret();
            const base32 = secret.base32;
        
            const token = jwt.sign({ email,base32 }, process.env.JWT_SECRET, { expiresIn: 2 * 60 * 1000 });
            res.header('x-auth-token', token);
            //go to otp_verify folder & sendotp and verifyUser
            res.json({status:true,msg:'OTP will be sent to your email.please kindly check it..'})

        }
        else{
            res.json({status:false,msg:"Email doesn't exists...Retry again"});
        }
    })
});

module.exports = router;
