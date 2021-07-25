//OAUTH2 CREADENTIALS OR NODEMAILER CONNECTION POOL

const nodemailer = require('nodemailer'); // using nodemailer for sending mails
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});


// credentias of Oauth2
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user:  process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        accessToken:process.env.ACCESS_TOKEN,
        refreshToken:process.env.REFRESH_TOKEN

    }
});

module.exports.transporter = transporter; //expoting tranporter(object)