const fetch =require('node-fetch');
const { validationResult } = require('express-validator');
const {OAuth2Client}=require('google-auth-library');
const Users = require('../model/users');
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const client=new OAuth2Client("821241871483-2v894njbu58fd7llvbmpg0e812n94tss.apps.googleusercontent.com");

// Google login  authentication
// !remaining
exports.googlelogin=async (req,res,next)=>{
    console.log('login')
    const {token,clientId,usergroup}=req.body;
    client.verifyIdToken({idToken:token,audience:"821241871483-ah0oc16fcbhtedm026m7h7qpk292f8f1.apps.googleusercontent.com"})
    .then(response=>{
        console.log(response.payload);
        const {name,picture,email,email_verified}=response.payload;
        // console.log('repeat');
        if(email){
            console.log('enter')
            Users.findOne({email:email})
            .then((user)=>{
                if(!user){
                    console.log('not user')
                    console.log(usergroup)
                    Users.create({
                        email:email,
                        firstname:name,
                        picture:picture,
                        verified:email_verified,
                        userType:usergroup,
                        // save the clients id in google database
                        google:clientId,
                    }).then((user)=>{
                        const token=jwt.sign({name:user.firstname,email:user.email,id:user._id},'thisissecretkeyyouwantthechange',{
                            expiresIn:'1h'
                        })
                        res.json({userId:user._id,token:token,flag:true})
                        // const decode=jwt.verify(token,'thisissecretkeyyouwantthechange');
                    });        
                }else{
                    console.log('compare')
                    if(user.google===clientId){
                        const token=jwt.sign({name:user.firstname,email:user.email,id:user._id},'thisissecretkeyyouwantthechange',{
                            expiresIn:'1h'
                        })
                        res.json({userId:user._id,token:token,flag:true})
                    }else if(user.google==='')
                    {
                        user.google=clientId;
                        user.save();
                    }
                }
            })
        }else{
            res.json({data:"Not A valid toke",flag:false})
        }
    })
    .catch((err)=>{
        throw new Error(err);
    })
}

// close Google login  authentication

// facebook  login  authentication

exports.facebooklogincheck=(req,res,next)=>{
    const {clientId}=req.body;
    console.log('client')
    Users.findOne({facebook:clientId})
    .then(user=>{
        if(user){
            console.log(user)
            res.json({flag:true});
        }else{
            res.json({flag:false});
        }
    })
    .catch((err)=>{
        throw new Error(err);
    })
}

// close facebook login  authentication
// !remaining
// facebook login
exports.facebooklogin=(req,res,next)=>{
    const {token,clientId,usergroup}=req.body;
    console.log(req.body);

    var email='';
    if(req.body.email!==""){
        email=req.body.email
    }
    console.log(token,clientId);
    let url=`https://graph.facebook.com/${clientId}?fields=id,name,email,picture&access_token=${token}`
    fetch(url,{
        method:'GET'
    })
    .then(data=>{
        return data.json();
    })
    .then(data=>{
        let {name,picture:{data:{
            url:image
        }}}=data;
        console.log('email',data.email)
        if(data.email){
            email=data.email;
        }
        Users.findOne({facebook:clientId})
        .then(user=>{
            if(user){
                if(user.facebook===clientId){
                    const token=jwt.sign({name:name,email:email,id:clientId},'thisissecretkeyyouwantthechange',{
                        expiresIn:'1h'
                    })
                    res.json({userId:user._id,token:token,flag:true})
                 }else if(user.facebook===''){
                    console.log('not exist')
                    user.facebook=clientId;
                    user.save();
                }
            }else{
                Users.create({
                    firstname:name,
                    picture:image,
                    email:email,
                    facebook:clientId,
                    userType:usergroup,
                    verified:email ? true: false,
                }).then(user=>{
                    if(user){
                        const token=jwt.sign({name:user.name,email:user.email,id:user.facebook},'thisissecretkeyyouwantthechange',{
                            expiresIn:'1h'
                        })
                        res.json({userId:user._id,token:token,flag:true})
                    }
                });
            }
        })
    })
    .catch((err)=>{
        throw new Error(err);
    })
}
// close facebook login



//This is the signup controllers
exports.signup=(req,res,next)=>{
    console.log("signup");
    const errors=validationResult(req);
    console.log(errors);
    
    if(!errors.isEmpty()){
        const err=new Error('Signup Error');
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
// generate the salt bcrypt
    var salt = bcrypt.genSaltSync(10);

    const {firstname,lastname,type,email,password}=req.body;
    bcrypt.genSalt(10, function(err, salt) {
        // Store hash in db.
        //hash is the encrypted format password
        bcrypt.hash(password, salt, function(err, hash) {
            const User=new Users({
                firstname:firstname,
                lastname:lastname,
                email:email,
                password:hash,
                verificationCode:req.verification,
                userType:type,
            });
        // insert the user information
            User.save()
             .then(user=>{
                if(user){
                    // jwt token to expire 1 hour
                    const token=jwt.sign({name:user.name,email:user.email,id:user._id},'orgoisthefreelancingcompany',{
                        expiresIn:'1h'
                    })
                    //Send the response in json format in frontend side;
                    res.json({token:token,flag:true,status:'two',userId:user._id})
                }
            })
            .catch((error)=>{
                const err=new Error('Signup Time Issue');
                err.data=error;
                err.statusCode=500;
                throw err;
            })     
        });
    })
}
exports.login=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Login Error')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    //we check the email and password
    const {email,password}=req.body;
    Users.findOne({email:email})
    .then((user)=>{
        if(user.verified){
            //bcrypt compare the database password and user enter passowrd if compare it shows true value
        bcrypt.compare(password,user.password,(err,result)=>{

          if(result){
            const token=jwt.sign({firstname:user.firstname,email:user.email,id:user._id},'thisissecretkeyyouwantthechange',{
                expiresIn:'1h'
            })
            res.json({userId:user._id,token:token,flag:result})
          }else{
            res.json({flag:false,data:"Your Credentials does not correct"})
          }
        })
        }
        else{
            res.json({flag:false,data:"Your are not authenticate"})
        }
    })
    .catch((err)=>{
        throw new Error(err);
    })
}