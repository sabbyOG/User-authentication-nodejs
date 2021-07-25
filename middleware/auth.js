//MIDDLEWARE FUNCTION TO DECODE JSONWEBTOKEN

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});

module.exports = async function (req,res,next){

    const token = await req.header('x-auth-token'); // token as header(input)
    if(!token) return res.status(401).json({status:false,msg:'Access denied.No token provided..'}) //returns error if no token provided
     try{
         const decoded = jwt.verify(token,process.env.JWT_SECRET); // decoding
         req.user = decoded; //storing in an object
         next(); 
        }
     catch(error){
      res.status(400).json({status:false,msg:'Invalid jwt token...'}); // returns error if invalid token provided
     };
};

