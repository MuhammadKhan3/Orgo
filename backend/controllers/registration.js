const fetch =require('node-fetch');
const { validationResult } = require('express-validator');
const {OAuth2Client}=require('google-auth-library');

const Users = require('../model/users');
const Hire= require('../model/hire');

var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const ct = require('countries-and-timezones');
const client=new OAuth2Client("821241871483-gt5pbv666jadqq2piairjgoec6nva9mp.apps.googleusercontent.com");
const NodeGeocoder = require('node-geocoder');
const Company = require('../model/company');
const CompanyProfile = require('../model/companyProfile');
const mongoose=require('mongoose')
const Employee = require('../model/employee');
const Proposals = require('../model/proposal');

// Stripe
const stripe=require('stripe')('sk_test_51LMaPPSASfMwgZx39yrUzyKqhmnng5XPuiSZug0cEH0cPxHMQIxbuo26845Ba18aOpKStOGUPrFuNHcmWqgGFLMq00AljYn8eH')
const uuid=require('uuid').v4
// closeStripe

// Start GeoCoding
const options = {
    provider: 'google',
    // Optional depending on the providers
    apiKey: 'AIzaSyAicYwQPXl18yNg2lhY23XEDRlFm4icjW4', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };
  const geocoder = NodeGeocoder(options);
// Close GeoCoding




// Google login  authentication
// !remaining
exports.googleSignup=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Google Login Error');
        err.data=errors.array();
        err.statusCode=500;
        throw err;
    }
    
    const {token,clientId,usergroup,companyName,coordinates}=req.body;


    client.verifyIdToken({idToken:token,audience:"821241871483-gt5pbv666jadqq2piairjgoec6nva9mp.apps.googleusercontent.com"})
    .then(response=>{



        const {name,picture,email,email_verified}=response.payload;

 Users.findOne({email:email})
.then((user)=>{

        if(usergroup==='company'){
                    // console.log(req.body.);
                    
                        if(email){
                                if(!user){
                                    Company.create({
                                        companyName:companyName,
                                        country:req.country,
                                        timezone:req.timezone
                                    }).then((company)=>{

                                    console.log('not user')
                                    console.log(usergroup)
                                    Users.create({
                                        email:email,
                                        firstname:name,
                                        picture:picture,
                                        verified:email_verified,
                                        userType:usergroup,
                                        // save the clients id in google database
                                        google:token,
                                        companyId:company._id
                                    }).then((user)=>{
                                        CompanyProfile.create({
                                           companyName:companyName,
                                            companyId:company._id,
                                            userId:user._id
                                        })
                                        const token=jwt.sign({name:user.firstname,email:user.email,userId:user._id},'orgoisthefreelancingcompany',{
                                            expiresIn:'1h'
                                        })
                                        res.json({userId:user._id,token:token,flag:true,companyId:company._id,userType:usergroup,authenticate:user.verified})
                                    });        
                                }).catch((error)=>{
                                        const err=new Error('Google Login Error');
                                        err.data=error;
                                        throw err;
                                })
                                }else{
                                  if(usergroup===user.userType || usergroup==='freelancer'){
                                    const token=jwt.sign({name:user.firstname,email:user.email,userId:user._id},'orgoisthefreelancingcompany',{
                                        expiresIn:'1h'
                                    })
                                    if(user.google.length>0){
                                        res.json({userId:user._id,token:token,flag:true,companyId:user.companyId,userType:user.userType,authenticate:user.verified})
                                    }else if(user.google==='')
                                    {
                                        user.google=token;
                                        user.save();
                                        res.json({userId:user._id,token:token,flag:true,companyId:user.companyId,userType:user.userType,authenticate:user.verified})
                                    }
                                  }else{
                                    res.json({msg:'Your account not the company please try other'})
                                  }
                                }
                    
                        }else{
                            res.json({data:"Not A valid toke",flag:false})
                        }

                    // console.log('repeat');
            }
            // Close Company


            // Freelancer
        else if(usergroup==='freelancer'){

                        if(email){
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
                                        google:token,
                                        companyId:req.companyId
                                    }).then((user)=>{
                                        const token=jwt.sign({name:user.firstname,email:user.email,useruserId:user._id},'orgoisthefreelancingcompany',{
                                            expiresIn:'1h'
                                        })
                                        res.json({userId:user._id,token:token,flag:true,companyId:req.companyId,userType:usergroup,authenticate:user.verified})
                                        // const decode=jwt.verify(token,'thisissecretkeyyouwantthechange');
                                    });        
                                }else{
                                    console.log('freelancer')
                                  if(usergroup===user.userType || usergroup==='company'){

                                    const token=jwt.sign({name:user.firstname,email:user.email,userId:user._id},'orgoisthefreelancingcompany',{
                                        expiresIn:'1h'
                                    })
                                    if(user.google.length>0){
                                        res.json({userId:user._id,companyId:user.companyId,token:token,flag:true,userType:user.userType,authenticate:user.verified})
                                    }else if(user.google==='')
                                    {
                                        user.google=token;
                                        user.save();
                                        res.json({userId:user._id,token:token,flag:true,companyId:user.companyId,userType:user.userType,authenticate:user.verified})
                                    }
                                  }else{
                                    res.json({msg:'Your account not the freelancer please try other'})
                                  }
                                }
                        }else{
                            res.json({data:"Not A valid toke",flag:false})
                        }
                
                    // console.log('repeat');

        }
        // Close Freelancer
        // Start Employee
        else {

                        if(email){
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
                                        google:token,
                                    }).then((user)=>{
                                        Employee.create({
                                            userId:user._id,
                                            country:req.country,
                                            timezone:req.timezone,
                                        }).then((employee)=>{
                                            const token=jwt.sign({name:user.firstname,email:user.email,userId:user._id},'orgoisthefreelancingcompany',{
                                                expiresIn:'1h'
                                            })
                                            res.json({userId:user._id,token:token,flag:true,employeeId:employee._id,userType:usergroup,authenticate:user.verified})
                                        })
                                        // const decode=jwt.verify(token,'thisissecretkeyyouwantthechange');
                                    });        
                                }else{
                                 if(usergroup==='employee' ){
                                
                                    Employee.findOne({userId:mongoose.Types.ObjectId(user._id)})
                                        .then((employee)=>{
                                            req.employeeId=employee._id;
                                            console.log(req.employeeId)
                                        
                                        if(user.google.length>0){
                                            const token=jwt.sign({name:user.firstname,email:user.email,userId:user._id},'orgoisthefreelancingcompany',{
                                                expiresIn:'1h'
                                            })
                                            console.log("employee id",req.employeeId)
                                            res.json({userId:user._id,token:token,employeeId:employee._id,flag:true,userType:user.userType,authenticate:user.verified})
                                        }else if(user.google==='')
                                        {
                                            user.google=token;
                                            user.save();
                                            res.json({userId:user._id,token:token,employeeId:employee._id,flag:true,userType:user.userType,authenticate:user.verified})
                                        }
                                    })
                                 }else{
                                    res.json({data:"Not A valid toke",flag:false})
                                 }
                                }
                        }else{
                            res.json({data:"Not A valid toke",flag:false})
                        }
        }
})
})
.catch((err)=>{
    throw new Error(err);
})
// Close Employee

}

exports.Googlelogin=(req,res,next)=>{
    const {token}=req.body;
    console.log('token');
    client.verifyIdToken({idToken:token,audience:"821241871483-gt5pbv666jadqq2piairjgoec6nva9mp.apps.googleusercontent.com"})
    .then(response=>{
        const {name,picture,email,email_verified}=response.payload;
      Users.findOne({email:email})
      .then(user=>{
        console.log(user)
        if(user && user.google.length>0){
            console.log('in')
            const token=jwt.sign({name:user.firstname,email:user.email,userId:user._id},'orgoisthefreelancingcompany',{
                expiresIn:'1h'
            })
            if(user.userType==='freelancer' || user.userType==='company'){
                res.json({token:token,flag:true,userType:user.userType,userId:user._id,companyId:user.companyId,authenticate:user.verified});
            }else if(user.userType==='employee'){
                Employee.findOne({userId:user._id})
                .then((employee)=>{
                    res.json({token:token,flag:true,userType:user.userType,userId:user._id,employeeId:employee._id,authenticate:user.verified});
                })
            }
        }else{
            res.json({flag:false,msg:'kindly create the account or google authenticate or signup'});
        }
        })
        .catch((err)=>{
            throw new Error(err);
        })    
    })
}


exports.SearchCompany=(req,res,next)=>{
    const {company}=req.query;

    Company
    .findOne({companyName:company.toLowerCase()})
    .then((company)=>{
        if(company){
            res.json({flag:true,msg:"Already Exist"})
        }
        else if(!company){
            res.json({flag:false,msg:"Not Exist"})
        }
    })
}
// close Google login  authentication
exports.getCompany=(req,res,next)=>{
    Company
    .find({},'companyName -_id')
    .then((company)=>{
        console.log(company)
        res.json({flag:true,company:company});
    })
}

// facebook  login  authentication

exports.facebooklogincheck=(req,res,next)=>{
    const {clientId,email}=req.body;
    console.log('client')
    Users.findOne({$or:[{facebook:clientId},{email:email}]})
    .then(user=>{
        if(user){
            res.json({flag:true,userType:user.userType,email:user.email});
        }else{
            res.json({flag:false});
        }
    })
    .catch((err)=>{
        throw new Error(err);
    })
}

// login Facebook
exports.facebooklogin=(req,res,next)=>{
    const {clientId}=req.body;

    Users.findOne({facebook:clientId})
    .then(user=>{
        if(user){
            const token=jwt.sign({name:user.firstname,email:user.email,userId:user._id},'orgoisthefreelancingcompany',{
                expiresIn:'1h'
            })
            if(user.userType==='freelancer' || user.userType==='company'){
                res.json({token:token,flag:true,userType:user.userType,userId:user._id,companyId:user.companyId,authenticate:user.verified});
            }else if(user.userType==='freelancer'){
                Employee.findOne({userId:user._id})
                .then((employee)=>{
                    res.json({token:token,flag:true,userType:user.userType,userId:user._id,employeeId:employee._id,authenticate:user.verified});
                })
            }
        }else{
            res.json({flag:false,msg:'kindly create the account'});
        }
    })
    .catch((err)=>{
        throw new Error(err);
    })
}
// Close Login Facebook


// close facebook login  authentication
// !remaining
// facebook login
exports.facebookSignup=(req,res,next)=>{
    console.log('faceebook')
//     const {token,clientId,usergroup,company}=req.body;
//     console.log(req.body);

//     var email='';
//     if(req.body.email!==""){
//         email=req.body.email
//     }

// if(usergroup==='company'){
//     let url=`https://graph.facebook.com/${clientId}?fields=id,name,email,picture&access_token=${token}`
//     fetch(url,{
//         method:'GET'
//     })
//     .then(data=>{
//         return data.json();
//     })
//     .then(data=>{
//         let {name,picture:{data:{url:image }}}=data;
//         console.log(data)
//         console.log('email',data.email)
//         if(data.email){
//             email=data.email;
//         }
//         console.log('email1',email);
//         Users.findOne({$or:[{facebook:clientId},{email:email}]})
//         .then(user=>{
//             if(user){
//                 console.log('already exist')
//                 if(user.facebook===clientId){
//                     const token=jwt.sign({name:name,email:email,id:clientId},'orgoisthefreelancingcompany',{
//                         expiresIn:'1h'
//                     })
//                     res.json({userId:user._id,token:token,flag:true,userType:user.userType,companyId:user.companyId,authenticate:true})
//                  }else if(user.facebook===''){
//                     console.log('not exist')
//                     user.facebook=clientId;
//                     user.save();
//                     res.json({userId:user._id,token:token,flag:true,userType:user.userType,companyId:user.companyId,authenticate:true})
//                 }
//             }else{
//                 Company.create({
//                     country:req.country,
//                     timezone:req.timezone,
//                     companyName:company
//                 }).then((company)=>{
//                     Users.create({
//                         firstname:name,
//                         picture:image,
//                         email:email,
//                         companyId:company._id,
//                         facebook:clientId,
//                         userType:usergroup,
//                         verified:email ? true: false,
//                     }).then(user=>{
//                         CompanyProfile.create({
//                             companyName:company,
//                             companyId:company._id,
//                             userId:user._id,
//                         })
//                         if(user){
//                             const token=jwt.sign({name:user.name,email:user.email,id:user.facebook},'orgoisthefreelancingcompany',{
//                                 expiresIn:'1h'
//                             })
//                             res.json({userId:user._id,token:token,flag:true,userType:user.userType,companyId:user.companyId,authenticate:true})
//                         }
//                     });
//                 })
//             }
//         })
//     })
//     .catch((err)=>{
//         throw new Error(err);
//     })
// }else if(usergroup==='freelancer'){
//     let url=`https://graph.facebook.com/${clientId}?fields=id,name,email,picture&access_token=${token}`
//     fetch(url,{
//         method:'GET'
//     })
//     .then(data=>{
//         return data.json();
//     })
//     .then(data=>{
//         let {name,picture:{data:{
//             url:image
//         }}}=data;


//         if(data.email){
//             email=data.email;
//         }

//         Users.findOne({$or:[{facebook:clientId},{email:email}]})
//         .then(user=>{
//             if(user){
//                 console.log('already exist');

//                 if(user.facebook===clientId || user){
//                     const token=jwt.sign({name:name,email:email,id:clientId},'orgoisthefreelancingcompany',{
//                         expiresIn:'1h'
//                     })
//                     res.json({userId:user._id,token:token,flag:true,userType:user.userType,companyId:user.companyId,authenticate:true})
//                  }else if(user.facebook==='' || user){
//                     console.log('not exist')
//                     user.facebook=clientId;
//                     user.save();
//                     res.json({userId:user._id,token:token,flag:true,userType:user.userType,companyId:user.companyId,authenticate:true})
//                 }
//             }else{
//                 Company.findOne({companyName:company})
//                 .then((company)=>{
//                     Users.create({
//                         firstname:name,
//                         picture:image,
//                         email:email,
//                         companyId:company._id,
//                         facebook:clientId,
//                         userType:usergroup,
//                         verified:email ? true: false,
//                     }).then(user=>{

//                         if(user){
//                             const token=jwt.sign({name:user.name,email:user.email,id:user.facebook},'orgoisthefreelancingcompany',{
//                                 expiresIn:'1h'
//                             })
//                             res.json({userId:user._id,token:token,flag:true,userType:user.userType,companyId:user.companyId,authenticate:true})
//                         }
//                     });
//                 })
                
        
//             }
//         })
//     })
//     .catch((err)=>{
//         throw new Error(err);
//     })
// }
// else {
//     let url=`https://graph.facebook.com/${clientId}?fields=id,name,email,picture&access_token=${token}`
//     fetch(url,{
//         method:'GET'
//     })
//     .then(data=>{
//         return data.json();
//     })
//     .then(data=>{
//         let {name,picture:{data:{
//             url:image
//         }}}=data;

//         if(data.email){
//             email=data.email;
//         }

//         Users.findOne({$or:[{facebook:clientId},{email:email}]})
//         .then(user=>{
//             if(user){

//                 if(user.facebook===clientId || user){
//                     const token=jwt.sign({name:name,email:email,id:clientId},'orgoisthefreelancingcompany',{
//                         expiresIn:'1h'
//                     })
//                     res.json({userId:user._id,token:token,flag:true,userType:user.userType,companyId:user.companyId})
//                  }else if(user.facebook==='' || user){
//                     console.log('not exist')
//                     user.facebook=clientId;
//                     user.save();
//                     res.json({userId:user._id,token:token,flag:true,userType:user.userType,companyId:user.companyId,authenticate:true})
//                 }
//             }else{
//                     Users.create({
//                         firstname:name,
//                         picture:image,
//                         email:email,
//                         companyId:company._id,
//                         facebook:clientId,
//                         userType:usergroup,
//                         verified:email ? true: false,
//                     }).then(user=>{
//                         Employee.create(
//                           {  userId:user._id}
//                         ).then((employee)=>{
                            
//                             if(user){
//                                 const token=jwt.sign({name:user.name,email:user.email,id:user.facebook},'orgoisthefreelancingcompany',{
//                                     expiresIn:'1h'
//                                 })
//                                 res.json({userId:user._id,token:token,flag:true,userType:user.userType,employeeId:employee._id,authenticate:true})
//                             }
//                         })
//                     });

                
        
//             }
//         })
//     })
//     .catch((err)=>{
//         throw new Error(err);
//     })
// }




}
// close facebook login

// Timezone and gecoding
exports.geocoding= async (req,res,next)=>{
    const {coordinates}=req.body
    if(coordinates.lat==0 && coordinates.long==0){
        return       res.json({msg:'Geocoding value does not collect'});
    }
    console.log('coordinates',coordinates);
    const response = await geocoder.reverse(coordinates);
    req.country=response[0].country;
    const countries = ct.getCountry(response[0].countryCode);
    req.timezone=countries.timezones[0];
    next();
}

//This is the signup controllers
exports.signup=(req,res,next)=>{
    console.log("signup");
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Signup Error');
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    const {firstname,lastname,type,email,password,companyName}=req.body;

//   Company Creation
if(type==='company'){
  Company.create({
    companyName:companyName,
    country:req.country,
    timezone:req.timezone,
  }).then((company)=>{

//     generate the salt bcrypt
    var salt = bcrypt.genSaltSync(10);

    bcrypt.genSalt(10, function(err, salt) {
        // Store hash in db.
        // hash is the encrypted format password
        bcrypt.hash(password, salt, function(err, hash) {
            const User=new Users({
                firstname:firstname,
                lastname:lastname,
                email:email,
                password:hash,
                verificationCode:req.verification,
                userType:type,
                companyId:company._id
            });
        // insert the user information
            User.save()
             .then(user=>{
                CompanyProfile.create({
                    companyName:companyName,
                    companyId:company._id,
                    userId:user._id  
                  });
                if(user){
                    // jwt token to expire 1 hour
                    const token=jwt.sign({name:user.name,email:user.email,userId:user._id},'orgoisthefreelancingcompany',{
                        expiresIn:'1h'
                    })
                    //Send the response in json format in frontend side;
                    res.json({token:token,flag:true,status:'two',userId:user._id,companyId:company._id,userType:user.userType});
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

  }).catch((error)=>{
    const err=new Error('Signup Company Error');
    err.statusCode=500;
    err.data=error;
    throw err;
  })
}
// Close Company
// Employeee
else if(type==='employee'){
    //     generate the salt bcrypt
    console.log('employee click')
        var salt = bcrypt.genSaltSync(10);
        bcrypt.genSalt(10, function(err, salt) {
            // Store hash in db.
            // hash is the encrypted format password
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
                    Employee.create({
                        userId:user._id,
                        country:req.country,
                        timezone:req.timezone,
                    }).then(employee=>{
                        if(user){
                            // jwt token to expire 1 hour
                            const token=jwt.sign({name:user.name,email:user.email,userId:user._id},'orgoisthefreelancingcompany',{
                                expiresIn:'1h'
                            })
                            //Send the response in json format in frontend side;
                            res.json({token:token,flag:true,status:'two',userId:user._id,userType:user.userType,employeeId:employee._id});
                        }

                    });
                })
                .catch((error)=>{
                    const err=new Error('Signup Time Issue');
                    err.data=error;
                    err.statusCode=500;
                    throw err;
                })     
            });
        })


}else{
        //     generate the salt bcrypt
        var salt = bcrypt.genSaltSync(10);
        bcrypt.genSalt(10, function(err, salt) {
            // Store hash in db.
            console.log('else')
            // hash is the encrypted format password
            bcrypt.hash(password, salt, function(err, hash) {
                const User=new Users({
                    firstname:firstname,
                    lastname:lastname,
                    email:email,
                    password:hash,
                    verificationCode:req.verification,
                    userType:type,
                    companyId:req.companyId,
                });
            // insert the user information
                User.save()
                 .then(user=>{

                        if(user){
                            // jwt token to expire 1 hour
                            const token=jwt.sign({name:user.name,email:user.email,userId:user._id},'orgoisthefreelancingcompany',{
                                expiresIn:'1h'
                            })
                            //Send the response in json format in frontend side;
                            res.json({token:token,flag:true,status:'two',userId:user._id,userType:user.userType,companyId:req.companyId});
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
// Close Employee

//   Close Company Creation
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
    console.log(email,password);
    Users.findOne({email:email})
    .then((user)=>{
        if(!user){
          return  res.json({flag:false,data:"User does not exist"})
        }
        
        if(user.verified){
            //bcrypt compare the database password and user enter passowrd if compare it shows true value
        bcrypt.compare(password,user.password,(err,result)=>{

          if(result){
            const token=jwt.sign({firstname:user.firstname,email:user.email,userId:user._id},'orgoisthefreelancingcompany',{
                expiresIn:'1h'
            })
              if(user.userType==='freelancer' || user.userType==='company'){
                res.json({userId:user._id,token:token,flag:true,authenticate:user.verified,companyId:user.companyId,userType:user.userType})
              }else if(user.userType==='employee'){
                Employee.findOne({userId:mongoose.Types.ObjectId(user._id)})
                .then((employee)=>{
                    res.json({userId:user._id,token:token,flag:true,authenticate:user.verified,employeeId:employee._id,userType:user.userType,authenticate:user.verified})
                })
              }
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


// Check out

exports.checkout=async (req,res,next)=>{
    console.log('payment')
    console.log(req.body)
    
    const {employeeId,companyId,companyprofile,amount,jobId,proposalId}=req.body;
    console.log(employeeId,companyId,companyprofile,amount)

    const {tokens,addresses}=req.body;
    Proposals.updateOne({_id:mongoose.Types.ObjectId(proposalId)},{$set:{hire:true}})
    .then((proposal)=>{
        console.log(proposal);
    })
    Hire.create({
        employeeId:employeeId,
            companyId:companyId,
            jobId:jobId,
            companyprofile:companyprofile,
            amount:amount,
            token:tokens,
            proposalId:proposalId,
            addresses:addresses,
        }).then((hire)=>{

         try{
            Company.updateOne({_id:mongoose.Types.ObjectId(companyId)},{$inc:{earn:amount}})
            .then(async(value)=>{
                // const key=uuid();
                // const charge = await stripe.charges.create(
                //     {
                //       amount: amount * 100,
                //       payment_method_types: ['card'],
                //       source: tokens.id,
                //       customer: hire._id,
                //       receipt_email: tokens.email,
                //       description: `Stripe Hire ${companyId}`,
                //       shipping: {
                //         name: tokens.card.name,
                //         address: {
                //           line1: tokens.card.address_line1,
                //           line2: tokens.card.address_line2,
                //           city: tokens.card.address_city,
                //           country: tokens.card.address_country,
                //           postal_code: tokens.card.address_zip,
                //         },
                //       },
                //     },
                //     {
                //         idempotencyKey:key,
                //     }
                //   );
                  
            })
         }catch(err){
            console.log(err)
             res.json(err)
         }
    })

}