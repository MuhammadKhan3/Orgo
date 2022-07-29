const express=require('express');
const { body } = require('express-validator');
const router=express.Router();
const regController=require('../controllers/registration');
const email=require('../controllers/email');
const Users = require('../model/users');
const mongoose=require('mongoose')
const  CompanyProfile= require('../model/companyProfile');
const Employee=require('../model/employee');
const profileRoutes=require('./profileroutes');
const proposalRoutes=require('./proposalroutes');
const jobRoutes=require('./jobroutes');
const Company = require('../model/company');
const googleemployeeId = require('../middleware/googleemployeeId');
const chatcontroller=require('../controllers/chatcontrollers');
const authenticate = require('../middleware/authenticate');
// router page

router.post('/google-logins',regController.Googlelogin);
router.post('/google',[
    body('companyName')
    .custom((companyName,{req})=>{
        return Company.findOne({companyName:companyName})
        .then((company)=>{
            if(req.body.usergroup==='freelancer' && company){
                req.companyId=company._id
                return true;
            }else if(req.body.usergroup==='company' && company){
                return Promise.reject('Company Already Exist')
            }else if(req.body.usergroup){
                return true;
            }
        })
    }),

],regController.geocoding,regController.googleSignup);


router.post('/facebook',regController.geocoding,regController.facebookSignup);
router.post('/facebook-login',regController.facebooklogin);
router.post('/facebookcheck',regController.facebooklogincheck);



router.post('/signup',[
    body('firstname').notEmpty().isLength({min:3,max:150}),
    body('lastname').notEmpty().isLength({min:3,max:150}),
    body('companyName').custom((companyName,{req})=>{        
       return  Company.findOne({companyName:companyName})
        .then((company)=>{
            // req.companyId=company._id;
            if(company && req.body.type==='company'){
                return Promise.reject('Company Name Already exist')
            } else if(!company && req.body.type==='freelancer'){
                return Promise.reject('Company not  exist')
            }
            else{
                if(company){
                    req.companyId=company._id
                }
                return true;
            }
          
        })
    }),
    body('email').notEmpty().isEmail()
    .custom(value=>{
        return Users.findOne({email:value})
        .then(user=>{
            if(user){
                return Promise.reject('Email Already exist')
            }else{
                return true
            }
        })
    })
    ,
    body('type').notEmpty(),
    body('password').notEmpty().isLength({min:5 ,max:50})
    .custom((password,{req})=>{
        if(password!==req.body.confirmPassword){
            throw new Error('Password does not match in server compare')
        }else{
            return true
        }
    })
],email.sendemail,regController.geocoding,regController.signup);
router.post('/login',
[
    body('email').notEmpty().isEmail().normalizeEmail(),
    body('password').notEmpty().isLength({min:6,max:20}),
]
,regController.login);
router.get('/send-email',email.sendemail);
router.post('/find-email',email.findEmail);
router.post('/verified',email.verified);
router.post('/verify-account',email.verifyAccount);

router.post('/password-change',[body('password').notEmpty().custom((value,{req})=>{
    if(password!==req.body.confirmPassword){
        throw new Error('Password does not match in server compare')
    }else{
        return true
    }

})],email.passwordhandler);

router.get('/get-company',regController.getCompany);
router.post('/check-company',regController.SearchCompany);
// Checkout


router.post('/checkout',regController.checkout);
// Chat controller
router.post('/userlist',chatcontroller.userlist);
router.post('/messagelist',chatcontroller.messagelist);
router.post('/send-message',chatcontroller.sendmessage);
router.post('/search-list',[
    body('key').isLength({min:1, max:400}).withMessage('kindly search the fileds')
],authenticate,chatcontroller.search);
router.post('/set-name',chatcontroller.setname);
// Chat controller

// Profile routes
router.use(profileRoutes);
router.use(jobRoutes);
router.use(proposalRoutes);
// close profile routes

module.exports=router;