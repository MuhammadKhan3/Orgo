const express=require('express');
const uploadJob=require('../middleware/uploadJob')
const mongoose=require('mongoose')
const {param}=require('express-validator')
const Jobcontroller=require("../controllers/jobcontrollers");
const Employee = require('../model/employee');
const router=express.Router();

const EmployeeValidation=[param('employeeId').custom(employeeId=>{
    return Employee.findOne({_id:mongoose.Types.ObjectId(employeeId)}).then((employee)=>{
        if (!employee) {
            console.log(employee);
            console.log('reject')
            return Promise.reject('Your account does not exist');
        }else{
            return true;
        }
    })
})]

router.post('/create-job/:employeeId',EmployeeValidation,uploadJob.array('files'),Jobcontroller.createJob);


router.put('/create-job/:jobId',uploadJob.array('files'),Jobcontroller.updateJob);
router.post('/get-job/:jobId',Jobcontroller.getJob);
router.get('/get-jobs',Jobcontroller.getJobs);
router.post('/fav-job',Jobcontroller.FavJob);
router.post('/search-jobs',Jobcontroller.searchJob);
router.get('/fav-job',Jobcontroller.getfavJob);



module.exports=router