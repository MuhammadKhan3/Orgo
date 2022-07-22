const express=require('express');
const Profile=require('../controllers/profile');
const mongoose=require('mongoose')
const upload = require('../middleware/uploadPortfolio');
const uploadProfile=require('../middleware/uploadprofile');
const { body } = require('express-validator');
const { param } = require('express-validator');
const User = require('../model/users');
const authenticate = require('../middleware/authenticate');
const router=express.Router();
// Freelancing Profile

const FreelancerValidation=[
    param('companyId').custom((value)=>{
        console.log('client',value)
        
        return User
        .findOne({_id:mongoose.Types.ObjectId(value)})
        .then((user)=>{
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
router.post('/company-information/:companyId',authenticate,Profile.companytitle);
router.post('/company-skill/:companyId',Profile.companyskills);
router.post('/company-language/:companyId',authenticate,Profile.companylanguages);
router.post('/company-education/:companyId',authenticate,Profile.companyeducation);
router.post('/company-workinghour/:companyId',authenticate,Profile.workinghours);
router.post('/reviews/:userId',FreelancerValidation,Profile.freeReviews);  //workin when review work
router.post('/portfolio/:companyId',upload.single('file'),Profile.companyPortfolio);
router.post('/company-rate/:companyId',authenticate,Profile.companyrate);
router.post('/company-profile/:companyId',authenticate,Profile.companyprofile);  //check
router.post('/company-picture/:companyId',uploadProfile.single('file'),Profile.companypicture);
// Close Freelancing Profile


// Employee................
router.post('/employee-picture/:employeeId',uploadProfile.single('file'),
Profile.emppicture);
router.put('/employe-name/:userId',authenticate,Profile.updatename)
router.post('/get-employee/:employeeId',Profile.getemployee);

// Company Details
router.post('/company-details/:employeeId',authenticate,Profile.companyDetail);

// Close Company Details

// Client Contacts
router.post('/company-contacts/:employeeId',Profile.companycontact);

// Close Client Contacts
// Close Client Profile..........
module.exports=router;