const nodemailer=require('nodemailer');
const Users = require('../model/users');
const crypto = require("crypto");
const bcrypt=require('bcryptjs');

//In this controllers we send the email for verification and save the code in req.verification
// where we store the value

exports.sendemail=async (req,res,next)=>{

    const {email,firstname,lastname}=req.body;
    crypto.randomInt(0, 1000000, (err, generate) => {
        const transporter=nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:{
                user:'muhammadkh3278@gmail.com',
                pass:'aiacatlkgusedzep'
                }
            })
        
            let mailoptions={
                from:'muhammadkh3278@gmail.com',
                to:email,
                subject:'Otp Verification',
                html:`<html>
                <body>
                <h3>Otp Verification Code Orgo pvt</h3><br/>
                <h1> Hello ${firstname} ${lastname}. </h1>
                <p>don,t share anyone kindly enter ${generate} the code in verification field.This code is expire after 1 hour</p>
                </body>
                </html>`
            }       
            transporter.sendMail(mailoptions,(err,info)=>{
                if(err){
                    console.log(err)
                }else{
                    req.verification=generate;
                    console.log('email send'+info.response);
                    next();
                }
            })

    })
    // .catch((err)=>{
    //     throw new Error(err);
    // });
  

}

// In this handler we find the email
exports.findEmail=(req,res,next)=>{
    const {email}=req.body;
    crypto.randomInt(0, 1000000, (err, generate) => {
        if (err)
        {
            throw err
        }
        Users.findOne({email:email})
       .then(user=>{
            if(user){
                user.verificationCode=generate;
                user.save();
                const transporter=nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth:{
                        user:'muhammadkh3278@gmail.com',
                        pass:'aiacatlkgusedzep'
                        }
                })              
                let mailoptions={
                        from:'muhammadkh3278@gmail.com',
                        to:email,
                        subject:'Otp Verification',
                        html:`<html>
                        <body>
                        <h3>Otp Forgot Password Orgo pvt</h3><br/>
                        <h1> Hello ${user.firstname} ${user.lastname}. </h1>
                        <p>don,t share anyone kindly enter ${generate} the code in verification field.This code is expire after 1 hour.</p>        
                        </body>
                        </html>`
                }
                transporter.sendMail(mailoptions,(err,info)=>{
                    if(err){
                            console.log(err)
                    }else{
                            console.log('email send'+info.response);
                    }
                })
                res.json({emailstatus:'two',flag:true})
            }else if(!user){
                res.json({emailstatus:'null',flag:true})
            }    
        })   
    })
    // .catch((err)=>{
    //     throw new Error(err);
    // });
}
// close find email handler

// Verified forgot the code handler
exports.verified=(req,res,next)=>{
    const {code,email}=req.body;
    Users.findOne(
        {email:email,
        verificationCode:code},
    )
    .then(user=>{
        if(user){
            user.verified=true;
            user.save();
            res.json({emailstatus:'three',flag:true});
        }
    })
    .catch((err)=>{
        throw new Error(err);
    })
}
// close the forgot verified handler

// verify the code signup time
exports.verifyAccount=(req,res,next)=>{
    const {code,email}=req.body;
    console.log(code,email);
    Users.findOne(
        {email:email,
        verificationCode:code,
        Date:{
            $gte:new Date(Date.now()-(30*60*1000))
        }}
    )
    .then(user=>{
        if(user){
            user.verified=true;
            user.save();
            res.json({status:'one',flag:true,authenticate:true});
        }
        else{
            res.json({status:'two',flag:false,msg:'Kindly enter the right code ',});
        }
    })
    .catch((err)=>{
        throw new Error(err);
    })
}
// close verify the code signup time


// start the change password handler
exports.passwordhandler=(req,res,next)=>{
    const {email,password}=req.body;
    Users.findOne({where:{email:email}})
    .then((user)=>{
        if(user){
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    user.password=hash;
                    user.save();
                    res.json({flag:true});
                }) 
            })    
        }
    })
    .catch((err)=>{
        throw new Error(err);
    })
}
// close the change password handler