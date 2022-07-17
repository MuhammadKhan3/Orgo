const express=require('express');
const uploadJob=require('../middleware/uploadJob')
const mongoose=require('mongoose')
const {param}=require('mongoose')
const Jobcontroller=require("../controllers/jobcontrollers")
const router=express.Router();

router.post('/create-job/:userId',uploadJob.array('files'),Jobcontroller.createJob);
router.put('/create-job/:jobId',uploadJob.array('files'),Jobcontroller.updateJob);
router.post('/get-job/:jobId',Jobcontroller.getJob);
router.get('/get-jobs',Jobcontroller.getJobs);
router.post('/fav-job',Jobcontroller.FavJob);
router.post('/search-jobs',Jobcontroller.searchJob);
router.get('/fav-job',Jobcontroller.getfavJob);



module.exports=router