const express= require('express');
const router= express.Router();
const bcrypt= require('bcryptjs');
const jwt =require('jsonwebtoken');
const keys=require('../../config/keys');
const passport=require('passport');
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
var _ = require('lodash');

//load input validation
const validateRegisterInput=require('../../validation/register')
const validateLoginInput=require('../../validation/login')

   




//model
const User=require('../../models/User');

router.get('/test',(req,res)=> res.json({msg: "Users Know"}));

///////////////////////////
// forgot password
// router.get('/Forgot', function(req, res) {
//     res.render('Forgot');
//   });


  router.post('/forgot', function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            // req.flash('error', 'No account with that email address exists.');
            return res.json({error:'User does not Exist'});
          }
  
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        console.log("here");
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail', 
          auth: {
            user: 'gamersdukes8122@gmail.com',
            pass: 'gamersdukes2281'
          }
        });
        
        var mailOptions = {
          to: user.email,
          
          from: 'gamersdukes8122@gmail.com',
          subject: 'Node.js Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://localhost:3000/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log('mail sent');
        //   req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/forgot');

    });
  });
  
  router.get('/reset/:token', function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        // req.flash('error', 'Password reset token is invalid or has expired.');
        //return res.redirect('/forgot');
        console.log("User not found");
      }
      res.render('reset', {token: req.params.token});
    });
  });

  router.put('/reset', function(req, res) {
    const { token } = req.body;
    var Password = req.body.Password;
    console.log(token);
    console.log(Password);

    User.findOne({resetPasswordToken:token }, (err, user) => {
        // if err or no user
        if (err || !user)
            return res.status("401").json({
                error: "Invalid Link!"
            });

            bcrypt.genSalt(10,(err,salt)=>{
              bcrypt.hash(Password,salt,(err,hash)=>{
                  if(err) throw err;
                  Password=hash;
                  // console.log("hashed pass: "+ Password );

                  const updatedFields = {
                    password: Password,
                    resetPasswordToken: ""
                };
        
                user = _.extend(user, updatedFields);
        
                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        });
                    }
                    res.json({
                        message: `Great! Now you can login with your new password.`
                    });
                });

              }) 
          })
         
        
    });
  });








//user register

router.post('/register',(req,res)=>{
    const {errors,isValid}= validateRegisterInput(req.body);
    
    //check validation
    if(!isValid){
        return res.json(errors);
    }

User.findOne({email: req.body.email}).then(user=>{
    if(user){
        errors.email='Email already exists';
        return res.json(errors);
    } else{
        User.findOne({phonenumber: req.body.phonenumber}).then(user1=>{
            if(user1){
                return res.json({Phone:'phone already exist'});
            }
            else{
                const newUser=new User({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    phonenumber:req.body.phonenumber
                });
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password=hash;
                        newUser.save().then(user=>res.json(user)).catch(err=> err.json(errors));
                    }) 
                })
            }
        });
    }
}) 

});

//User login
//return token

router.post('/login',(req,res)=>{

    const {errors,isValid}= validateLoginInput(req.body);
    
    //check validation
    if(!isValid){
        return res.json(errors);
    }



const email=req.body.email;
const password=req.body.password;

    User.findOne({email}).then(user=>{
        if(!user){
            errors.email='User not found';
            return res.json(errors);
        }

        bcrypt.compare(password,user.password).then(isMatch=>{
          // console.log('Login Successfull'); 
          if(isMatch){
            console.log('Login Successfull');
            const payload={ id: user.id, name:user.name }

           //sign token
            jwt.sign(payload,keys.secretOrKey,{expiresIn: 3600 },(err,token)=>{
               res.json({
                success: true,
                token: 'Bearer '+ token
               });
            });
       
            
              
          }
        else{
            errors.password='password incorrect'
            return res.json(errors);
        }
        });
    });

});
//current user

router.get('/current',passport.authenticate('jwt',{session:false}),
 (req,res)=>{

    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,

    });
 });

module.exports=router;