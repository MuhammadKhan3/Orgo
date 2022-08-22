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
    body('heading').exists().isLength({ min: 2,max:300 }).withMessage('heading length greater than 2 and less than 300'),
    body('description').isLength({min:2,max:2000}),
    body('category').not().isEmpty().withMessage('Category is required'),
    param('employeeId').exists().withMessage('EmployeeId is required'),
    // body('skill').notEmpty().isArray({min:1,max:10}).withMessage('skill length greater than 1 and less than 10'),
    body('budget.min').not().isEmpty().isNumeric({min:0,max:6}),
    body('budget.max').notEmpty().
    isNumeric({min:0,max:6})
    .custom((max,{req})=>{
        const {body:{budget:{min}}}=req;

        if(parseFloat(max)>=parseFloat(min)){
            console.log('true')
            return true
        }else{
            console.log('reject')
            return Promise.reject('maximum value is less than minimum value');
        }
    }),

]
,Jobcontroller.createJob);


router.post('/edit-job/:jobId',uploadJob.array('file'),[
    body('heading').exists().isLength({ min: 2,max:300 }).withMessage('heading length greater than 2 and less than 300'),
    body('description').isLength({min:2,max:2000}),
    body('category').not().isEmpty().withMessage('Category is required'),
    // body('files').custom(()=>{
    // }),
    param('employeeId').exists().withMessage('EmployeeId is required'),
    body('skill').notEmpty().isArray({min:1,max:10}).withMessage('skill length greater than 1 and less than 10'),
    body('budget.min').not().isEmpty().isNumeric({min:0,max:6}),
    body('budget.max').notEmpty().
    isNumeric({min:0,max:6})
    .custom((max,{req})=>{
        const {body:{budget:{min}}}=req;

        if(parseFloat(max)>=parseFloat(min)){
            console.log('true')
            return true
        }else{
            console.log('reject')
            return Promise.reject('maximum value is less than minimum value');
        }
    }),

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

router.post('/bestmatch-jobs',authenticate,Jobcontroller.bestmatchJob);

router.post('/search-list',Jobcontroller.searchlist);



router.post('/fav-job/:jobId',authenticate,Jobcontroller.FavJob);
router.post('/fav-jobs',authenticate,Jobcontroller.getfavJob);
router.post('/get-employeeJob',Jobcontroller.getemployeejob);


module.exports=router
