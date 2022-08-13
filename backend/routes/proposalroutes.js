
const express=require('express');
const uploadProposal = require('../middleware/uploadProposal');
const mongoose=require('mongoose')
const CompanyProfile=require('../model/companyProfile');
const {body}=require('express-validator');
const router=express.Router();
const ProposalControllers=require('../controllers/propsallcontrollers');
const authform = require('../middleware/authform');
const authenticate = require('../middleware/authenticate');

router.post('/create-proposal/:jobId',authform,uploadProposal.single('file'),ProposalControllers.createProposal);
router.post('/proposal-list/:jobId',authenticate,ProposalControllers.getProposal);
router.post('/proposal-length/:jobId',ProposalControllers.numberProposal);
module.exports=router;