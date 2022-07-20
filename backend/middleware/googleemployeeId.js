const Employee = require("../model/employee")


module.exports=(req,res,next)=>{
    if(req.body.usergroup==='employee'){
        Employee.findOne({google:req.body.clientId})
        .then((employee)=>{
            req.employeeId=employee._id;
            next();
        })
    }
    next();
}