const express=require('express');
const uploadJob=require('../middleware/uploadJob')
const mongoose=require('mongoose')
const {param}=require('express-validator')
const {body}=require('express-validator')
const authenticate=require('../middleware/authenticate');
const proposalcontroll=require('../controllers/propsallcontrollers.js')
const Jobcontroller=require("../controllers/jobcontrollers");
const Employee = require('../model/employee');
const Jobs = require('../model/job');
const authform = require('../middleware/authform');
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

router.post('/create-job/:employeeId',authform,EmployeeValidation,uploadJob.array('files'),
[
    // body('heading').exists().isLength({ min: 2,max:300 }).withMessage('heading length greater than 2 and less than 300'),
    // body('description').isLength({min:2,max:2000}),
    // body('category').exists().isLength({min:2}),
    // // body('employeeId').exists().withMessage('EmployeeId is required'),
    // body('*.min').exists().isNumeric(),
    // body('*.max').exists().isNumeric(),
]
,Jobcontroller.createJob);


router.post('/edit-job/:jobId',uploadJob.array('file'),[
    // body('heading').isLength({ min: 5,max:20 }),
    // body('description').isLength({min:5,max:500}),
    // param('jobId').custom(jobId => {
    //     return Jobs.findOne({_id:mongoose.Types.ObjectId(jobId)})
    //     .then(job => {
    //       if (job) {
    //         return true;
    //       }else{
    //         Promise.reject('E-mail already in use');
    //       }
    //     });
    // }),
    // body('category').exists().isLength({min:2}),
    // body('skill').notEmpty(),
    // body('*.min').exists().isNumeric(),
    // body('*.max').exists().isNumeric(),
],Jobcontroller.updateJob);


router.post('/get-job/:jobId',authenticate,Jobcontroller.getJob);


router.post('/get-jobs',
[
    body('userId','Required userId value').not().isEmpty(),
],authenticate,Jobcontroller.searchlist,Jobcontroller.getJobs);



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
