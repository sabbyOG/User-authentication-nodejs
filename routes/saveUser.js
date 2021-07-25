//API TO SAVE USER_INFO

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const { db } = require('../mysql/db');
const bcrypt = require('bcrypt')


router.post('/',auth,async(req,res)=>{
    
    const {name,email,phone,password} = await req.user;  // accessing decoded user-input that we took in signup.js file by using auth middleware function(go to auth.js)

    db.query('SELECT `email` FROM `Users` WHERE `email` =  ?',[email],async(error,results)=>{
        if (error) return res.json({ status: false, msg: error.sqlMessage });

        if (results.length > 0) {
          res.json({ status: false, msg: "email already exists.." });
    
        };

        const salt = await bcrypt.genSalt(10); // genearting salt here
        const hashedPassword = await bcrypt.hash(password,salt)//using SALT for hashing user_password

        //mysql query for saving user-data here
        db.query('INSERT INTO `Users` SET ?',{name:name,email:email,phone:phone,password:hashedPassword},async(error,results)=>{

            if (error) return res.json({ status: false, msg: error.sqlMessage });//returns error if error occur while saving data
            if(results) return  res.json({status:true,msg:'You are successfully registered...'})
            
        });
    }); 

});


module.exports = router;

