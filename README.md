# API for User-Authentication using NodeJs

This is user-Authentication API using speakeasy for OTP's, nodemailer to sent OTP's by email & JWT(Jsonwebtoken) .You can log-in just by using email & password.

The API based on Node.js, Express,Bcrypt, NodeMailer, Speakeasy & MySQL.

Speakeasy use base32 secret-key for generating current-time OTP's whereas NodeMailer use Oauth2.And MySQL is a relational database management system based on SQL.
Bcrypt used for hashing password with SALT.

## GUIDE TO API

Guide to each API in sequences.

### 1. http://localhost:5000/api/signup

This API takes name,email,phone,password,confirm password as an user-input in json-format,it also generate base32 secret-key for speakeasy to generate 6-digit OTP in future and send to header('x-auth-token') by using jwt(jsonwentoken) encryption.

### 2. http://localhost:5000/api/sendotp

This API send OTP just by taking jwt(jsonwebtoken) as header('x-auth-token).

### 3. http://localhost:5000/api/verifyUser

This API takes OTP as input(json-format) which is a 6-digit code and header('x-auth-token').

### 4. http://localhost:5000/api/saveUser

This API save user just by taking jwt(jsonwebtoken) as header('x-auth-token).

### 5. http://localhost:5000/api/login

This API takes email,password as an user-input(json-format) and check whether password correct or not.

### 6. http://localhost:5000/api/forgetpass

This API takes email as an user-input,generate base32 secret-key for speakeasy to generate 6-digit OTP in future and send to header('x-auth-token).
#### NOTE:Use API number 2 and 3 for sending otp and verifying-user.

### 7. http://localhost:5000/api/changepass

This API takes password,password_confirmation as an user-input(json-format) and header('x-auth-token') for update/change your password.
#### NOTE:passwords are stored by salting encryption.

# User-authentication-nodejs
