const express=require('express');
const { body } = require('express-validator');
const router=express.Router();
const regController=require('../controllers/registration');
const email=require('../controllers/email');
const Users = require('../model/users');
const FlProfile = require('../model/freelancerprofile');
const profileRoutes=require('./profileroutes');
const proposalRoutes=require('./proposalroutes');
const jobRoutes=require('./jobroutes')
// router page
router.post('/google',regController.googlelogin);
router.post('/facebook',regController.facebooklogin);
router.post('/facebookcheck',regController.facebooklogincheck);

router.post('/signup',[
    body('firstname').notEmpty().isLength({min:3,max:150}),
    body('lastname').notEmpty().isLength({min:3,max:150}),
    body('email').notEmpty().isEmail()
    .custom(value=>{
        return Users.findOne({email:value})
        .then(user=>{
            if(user){
                return Promise.reject('Email Already exist')
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
],email.sendemail,regController.signup);
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

// Profile routes
router.use(profileRoutes);
router.use(jobRoutes);
router.use(proposalRoutes);
// close profile routes

module.exports=router;