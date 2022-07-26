
const express=require('express');
const uploadProposal = require('../middleware/uploadProposal');
const mongoose=require('mongoose')
const CompanyProfile=require('../model/companyProfile');
const {body}=require('express-validator');
const router=express.Router();
const ProposalControllers=require('../controllers/propsallcontrollers');


router.post('/create-proposal/:jobId',uploadProposal.single('file'),ProposalControllers.createProposal);
router.post('/create-proposals/:jobId',ProposalControllers.getProposal);
router.post('/proposal-length/:jobId',ProposalControllers.numberProposal);
module.exports=router;