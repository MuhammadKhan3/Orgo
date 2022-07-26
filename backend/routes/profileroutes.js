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


router.post('/company-information/:companyId',[

],authenticate,Profile.companytitle);
router.post('/company-skill/:companyId',[
    
],Profile.companyskills);

router.post('/company-language/:companyId',authenticate,Profile.companylanguages);
router.post('/company-education/:companyId',authenticate,Profile.companyeducation);
router.post('/company-workinghour/:companyId',authenticate,Profile.workinghours);
router.post('/reviews/:userId',Profile.freeReviews);  //workin when review work
router.post('/portfolio/:companyId',upload.single('file'),Profile.companyPortfolio);
router.post('/company-rate/:companyId',authenticate,Profile.companyrate);
router.post('/company-profile/:companyId',authenticate,Profile.companyprofile);  //check
router.post('/company-picture/:companyId',uploadProfile.single('file'),Profile.companypicture);
// Close Freelancing Profile


// Employee................
router.post('/employee-picture/:employeeId',uploadProfile.single('file'),
Profile.emppicture);
router.put('/employe-name/:userId',authenticate,Profile.updatename)
router.post('/get-employee/:employeeId',authenticate,Profile.getemployee);

// Company Details
router.post('/company-details/:employeeId',authenticate,[
    body('companyName','Company Name is greater than 3 and less than 200').isLength({min:3,max:200})
],Profile.companyDetail);

// Close Company Details

// Client Contacts
router.post('/company-contacts/:employeeId',authenticate,[
    body('phone','Phone No is equal to 11 numbers').isLength({min:11,max:11}),
    body('country','country length greater then 3 and less then 300').isLength({min:3,max:300}),
    body('ownerName','ownername greater than 3 and less than 200').isLength({min:3,max:200})
],Profile.companycontact);

// Close Client Contacts
// Close Client Profile..........
module.exports=router;