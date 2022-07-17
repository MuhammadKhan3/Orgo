const express=require('express');
const Profile=require('../controllers/profile');
const mongoose=require('mongoose')
const upload = require('../middleware/uploadPortfolio');
const uploadProfile=require('../middleware/uploadprofile');
const { body } = require('express-validator');
const { param } = require('express-validator');
const User = require('../model/users');
const router=express.Router();
// Freelancing Profile

const FreelancerValidation=[
    param('userId').custom((value)=>{
        console.log('client',value)
        
        return User
        .findOne({_id:mongoose.Types.ObjectId(value)})
        .then((user)=>{
            console.log(user.userType==='freelancer')
            if(user.userType==='freelancer'){
                return true;
            }else{
                console.log('reject');
                return Promise.reject('This is not a freelancer account');
            }
        
        })
    })
]
const EmployeeValidation=[
    param('userId').custom((value)=>{
        console.log('client',value)
        
        return User
        .findOne({_id:mongoose.Types.ObjectId(value)})
        .then((user)=>{
            console.log(user)
            if(user.userType==='employee'){
                return true;
            }else{
                return Promise.reject('This is not a Employee account');
            }
        
        })
    })
]
router.post('/free-profile/:userId',FreelancerValidation,Profile.freeinformation);
router.post('/skills/:userId',FreelancerValidation,Profile.freeskills);
router.post('/languages/:userId',FreelancerValidation,Profile.freelanguages);
router.post('/education/:userId',FreelancerValidation,Profile.freeeducation);
router.post('/reviews/:userId',FreelancerValidation,Profile.freeReviews);
router.post('/portfolio/:userId',FreelancerValidation,upload.array('files'),Profile.freePortfolio);
router.post('/rate/:userId',FreelancerValidation,Profile.freerate);
router.post('/getprofile/:userId',FreelancerValidation,Profile.freegetprofile);
router.post('/uploadprofile/:userId',FreelancerValidation,uploadProfile.single('file'),Profile.freeuploadProfile);
// Close Freelancing Profile


// Employee................
router.post('/cli-profile/:userId',uploadProfile.single('file'),
Profile.ClientuploadProfile);

// Company Details
router.post('/company-details/:userId',EmployeeValidation,Profile.companyDetail);

// Close Company Details

// Client Contacts
router.post('/company-contacts/:userId',EmployeeValidation,Profile.clicontacts);

// Close Client Contacts
// Close Client Profile..........
module.exports=router;