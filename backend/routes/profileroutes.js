const express=require('express');
const Profile=require('../controllers/profile');
const mongoose=require('mongoose')
const upload = require('../middleware/uploadPortfolio');
const uploadProfile=require('../middleware/uploadprofile');
const { body } = require('express-validator');
const { param } = require('express-validator');
const User = require('../model/users');

const router=express.Router();
// Employee Profile
router.post('/emp-profile/:userId',Profile.empinformation);
router.post('/skills/:userId',Profile.empskills);
router.post('/languages/:userId',Profile.emplanguages);
router.post('/education/:userId',Profile.education);
router.post('/reviews/:userId',Profile.empReviews);
router.post('/portfolio/:userId',upload.array('files'),Profile.empPortfolio);
router.post('/rate/:userId',Profile.emprate);
router.post('/getprofile/:userId',Profile.empgetprofile);
router.post('/uploadprofile/:userId',uploadProfile.single('file'),Profile.empuploadProfile);
// Close Employee Profile

// Client Profile................
router.post('/cli-profile/:userId',uploadProfile.single('file'),
// [
//     param('userId').custom(value=>{
//         console.log('client',value)
        
//         return User
//         .findOne({_id:mongoose.Types.ObjectId(value)})
//         .then((user)=>{
//             console.log(user.userType)
//             if(user.userType==='employee'){
//                 return true;
//             }else{
//                 console.log('reject')
//                 return Promise.reject('This is not a Employee account');
//             }
        
//         })
//     })
// ]

Profile.ClientuploadProfile);


// Company Details
router.post('/company-details/:userId',Profile.companyDetail);

// Close Company Details

// Client Contacts
router.post('/company-contacts/:userId',Profile.clicontacts);

// Close Client Contacts
// Close Client Profile..........
module.exports=router;