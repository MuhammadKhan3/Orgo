const express=require('express');
const uploadJob=require('../middleware/uploadJob')
const mongoose=require('mongoose')
const {param}=require('express-validator')
const {body}=require('express-validator')

const Jobcontroller=require("../controllers/jobcontrollers");
const Employee = require('../model/employee');
const router=express.Router();

const EmployeeValidation=[param('employeeId').custom(employeeId=>{
    return Employee.findOne({_id:mongoose.Types.ObjectId(employeeId)}).then((employee)=>{
        if (!employee) {
            console.log(employee);
            
            return Promise.reject('Your account does not exist');
        }else{
            return true;
        }
    })
})]

router.post('/create-job/:employeeId',EmployeeValidation,uploadJob.array('files'),Jobcontroller.createJob);


router.post('/edit-job/:jobId',uploadJob.array('file'),Jobcontroller.updateJob);

router.post('/get-job/:jobId',Jobcontroller.getJob);

router.post('/get-jobs',
[
    body('userId','Required userId value').not().isEmpty(),
],Jobcontroller.searchlist,Jobcontroller.getJobs);

router.post('/search-jobs',
[
    body('userId','Required userId value').not().isEmpty(),
    body('search','Required search value').not().isEmpty(),
],Jobcontroller.searchlist,Jobcontroller.searchJob);

router.post('/bestmatch-jobs',Jobcontroller.bestmatchJob);

router.post('/search-list',Jobcontroller.searchlist);


router.post('/fav-job/:jobId',Jobcontroller.FavJob);
router.post('/fav-jobs',Jobcontroller.getfavJob);

router.post('/get-employeeJob',Jobcontroller.getemployeejob);


module.exports=router
