//API FOR LOGIN

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Joi = require('joi');
// const { string } = require('joi');
const { db } = require('../mysql/db');

dotenv.config({path:'./.env'});

// validating User data through JOI npm package
const schema = Joi.object({
    email:Joi.string().min(8).max(40).required(),
    password:Joi.string().min(7).max(24).required(),
   
});  

router.post('/',async(req,res)=>{

    const {email,password}  = await req.body; //user-input

    const {error} = schema.validate({email,password}); // validating user data here

    if(error) return res.json({status:false,msg:error.message});  // returns error if user-input is invalid

       //mysql query for selecting email from database
    db.query('SELECT *FROM `Users` WHERE `email`= ?',[email],async(error,results)=>{

        if (error) return res.json({ status: false, msg: error.sqlMessage });

        if(results.length > 0 ){
         
//if email exist comaparing user-input-password and password saved in database
            const validPassword = await bcrypt.compare(password,results[0].password);
            if(!validPassword) return res.status(400).json({status:false,msg:'Invalid email or password'}); // if password doesn't match

            res.json({status:true,msg:'logged in...'})

        }
        else{
            //returns false if email doesn't exists in our database
            res.json({status:false,msg:"Account doesn't exists.create your account first...."})
        }

    })

})



module.exports = router;