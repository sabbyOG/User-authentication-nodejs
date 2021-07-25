//API TO CHANGE USER PASSWORD

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Joi = require('joi');
const { db } = require('../mysql/db');
const auth = require('../middleware/auth');


dotenv.config({path:'./.env'});

// validating User data through JOI npm package
const schema = Joi.object({
    password: Joi.string().min(3).max(15).required(),
password_confirmation: Joi.any().valid(Joi.ref('password')).required()

});  

router.post('/',auth,async(req,res)=>{

    const {email}  = await req.user;
    const {password,password_confirmation} = await req.body;
    const {error} = schema.validate({password,password_confirmation});
    if(error) return res.json({status:false,msg:error.message});

    db.query('SELECT *FROM `Users` WHERE `email`= ?',[email],async(error,results)=>{

        if (error) return res.json({ status: false, msg: error.sqlMessage });

        if(results.length > 0 ){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);

            db.query('UPDATE `Users` SET `password` = ? Where `email` = ?',[hashedPassword,email],async(error,results)=>{
                if(error) return res.json({status:false,msg:error.sqlMessage});
                if(results){
                    res.json({status:true,msg:"password changed sucessfully"});
                }
                
            });
        }
        else{
            res.json({status:false,msg:"Account doesn't exists.create your account first...."})
        }

    })

})





module.exports = router;