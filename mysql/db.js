const mysql  = require('mysql');
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config({path:'./.env'});

//your mysql database credentials
const db = mysql.createConnection({

host:process.env.HOST,
user:process.env.USER,
password:process.env.PASS,
database: process.env.DATABASE
});

//returns error if error occurs
db.connect(function(error){
    if(error) throw error;
    console.log('connected to DB!');
});

module.exports = router;
module.exports.db = db; // expoting db(object)