
const express=require('express');
const uploadProposal = require('../middleware/uploadProposal');
const mongoose=require('mongoose')
const CompanyProfile=require('../model/companyProfile');
const {body}=require('express-validator');
const router=express.Router();
const ProposalControllers=require('../controllers/propsallcontrollers');
const FreelancerValidation=[
    body('freelancerId').custom((freelancerId)=>{
        console.log(freelancerId)
        CompanyProfile.findOne({_id:mongoose.Types.ObjectId(freelancerId)})
        .then((freelancer)=>{
            if(freelancer){
                return true;
            }else{
                return Promise.reject('Freelancer account does not exist');
            }
        })
    })
]


router.post('/create-proposal/:jobId',uploadProposal.array('files'),FreelancerValidation,ProposalControllers.createProposal);
router.post('/create-proposals/:jobId',ProposalControllers.getProposal);
router.post('/proposal-length/:jobId',ProposalControllers.numberProposal);
module.exports=router;