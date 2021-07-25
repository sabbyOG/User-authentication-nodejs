const express = require('express');
const router = express.Router();
const speakeasy = require('speakeasy');
const dotenv = require('dotenv');
const auth = require('../middleware/auth')


dotenv.config({path:'./.env'});

router.post('/',auth,async(req,res)=>{


    const {otp} = await req.body;
    const {base32}  = await  req.user;

    console.log(base32);


const verifyingOtp = speakeasy.totp.verify({
  secret: base32,
  encoding: 'base32',
  token: otp,
  window: 6
});

console.log(verifyingOtp);

if(verifyingOtp === true){
    res.json({status:true,msg:'Your email address is successfully verified'})
}
else{
    res.json({status:false,msg:'Incorrect OTP please try again...'});
    console.log(otp);
};
});


module.exports = router;
