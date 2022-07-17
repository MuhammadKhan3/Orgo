
const express=require('express');
const uploadProposal = require('../middleware/uploadProposal');
const router=express.Router();
const ProposalControllers=require('../controllers/propsallcontrollers');

router.post('/create-proposal/:jobId',uploadProposal.array('files'),ProposalControllers.createProposal);
router.post('/create-proposals/:jobId',ProposalControllers.getProposal);
router.post('/proposal-length/:jobId',ProposalControllers.numberProposal);
module.exports=router;