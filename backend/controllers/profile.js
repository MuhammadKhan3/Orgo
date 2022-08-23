const CompanyProfile= require("../model/companyProfile");
const User = require("../model/users")
const mongoose=require('mongoose')
const { validationResult } = require('express-validator');
const Employee = require("../model/employee");




exports.companyprofile=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    let companyId=req.params.companyId;
    CompanyProfile.findOne({companyId:mongoose.Types.ObjectId(companyId)})
    .populate('companyId')
    .then((user)=>{
        res.json(user);
    })
}


// In this function we upload the file in user profile
exports.companypicture=(req,res,next)=>{
    console.log('hi')
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    console.log(req.body)
    let {companyId}=req.params;
    const file=req.file;
    CompanyProfile.updateOne({companyId:mongoose.Types.ObjectId(companyId)},{$set:{picture:file.filename}})
    .then((update)=>{
        if(update){
            res.json({msg:'Upload  Succefully',flag:true})
        }
    })
}


// Close User Profile

// Freelancing title and description 
exports.companytitle=(req,res,next)=>{    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }

    const {title,description}=req.body
    const {companyId}=req.params;

    CompanyProfile.findOne({companyId:mongoose.Types.ObjectId(companyId)})
    .then((companyprofile)=>{
        if(companyprofile){
            companyprofile.title=title;
            companyprofile.description=description;
            companyprofile.save();
            res.json({flag:true,msg:' Succefully Updated'})
        }else{
            CompanyProfile.create({
                title:title,
                description:description,
                companyId:companyId,
            }).then((profile)=>{
                if(profile){
                    res.json({flag:true,msg:'Message Succefully insert'})
                }
            }).catch((error)=>{
                const err=new Error('Information issue');
                err.statusCode=500;
                err.data=error;
                throw err
            })
        }
    })
}
// close title and description in freelancing


// Skills
exports.companyskills=(req,res,next)=>{
    console.log('skillls')
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    
    const {companyId}=req.params;
    const {skills}=req.body
    
    CompanyProfile
    .findOne({companyId:mongoose.Types.ObjectId(companyId)})
    .then((companyprofile)=>{
        if(companyprofile){
            companyprofile.skills=skills;
            companyprofile.save();
            res.json({msg:'Skills Succefully Update',flag:true})
        }  else{
            CompanyProfile.create({
                skills:skills,
                companyId:companyId,
            }).then((profile)=>{
                if(profile){
                    res.json({msg:'Created Succefully ',flag:true})
                }                
            })
        }
    })
}
// close Skills

// Start Languages
exports.companylanguages=(req,res,next)=>{
    console.log('language')
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    const companyId=req.params.companyId;
    const {language,level}=req.body
    console.log(language,level)
    var languages={languages:language,level:level};

    CompanyProfile.findOne({companyId:mongoose.Types.ObjectId(companyId)})
    .then((companyprofile)=>{
        if(companyprofile){
            companyprofile.languages.push(languages);
            companyprofile.save();
            res.json({msg:'Languages Succefully Upadte',flag:true})
        }  else{
            CompanyProfile.create({
                languages:languages,
                companyId:companyId,
            }).then((profile)=>{
                if(profile){
                    res.json({msg:'Created Succefully ',flag:true})
                }                
            })
        }
    })
}
// close Languages
exports.workinghours=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log('error',errors.array())
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    console.log(req)
    const {companyId}=req.params;
    const {hourworking}=req.body;
    console.log(companyId,hourworking);
    CompanyProfile
    .updateOne({companyId:mongoose.Types.ObjectId(companyId)},{$set:{hourworking:hourworking}},(err,docs)=>{
        if (err){
            res.status(200).json({msg:err,flag:false})

        }
        else{
            console.log(" : ", docs);
            res.status(200).json({msg:"Updated working hour",flag:true,})
        }   
    })
}

// Education
exports.companyeducation=(req,res,next)=>{
    console.log(req)
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log('error',errors.array())
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }

    const {companyId}=req.params;
    console.log(companyId)
    const {school,degree,degreelevel,description}=req.body;
    console.log(school,degree,degreelevel,description)
    CompanyProfile
    .findOne({companyId:mongoose.Types.ObjectId(companyId)})
    .then((companyprofile)=>{
        console.log('company')
        if(companyprofile){
            companyprofile.education={school:school,degree:degree,degreelevel:degreelevel,description:description};
            companyprofile.save();
            res.json({msg:'education Succefully Upadte',flag:true})
        }else{
            CompanyProfile.create({
                education:{school:school,degree:degree,degreelevel:degreelevel,description:description},
                companyId:companyId
            }).then((profile)=>{
                if(profile){
                    res.json({msg:'Created Succefully',flag:true})
                }                
            })
        }

    })
}
// Close Education


// Rating
exports.freeReviews=(req,res,next)=>{
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }

    const userId=req.params.userId;
    const {reviews}=req.body;
    const review=reviews.filter((value)=>{
        return String(value.userId)!==String(userId);
    })
    
    // console.log(reviews);
    CompanyProfile.findOne({userId:mongoose.Types.ObjectId(userId)}).then((user)=>{
        if(user){
            user.reviews=reviews;
            user.save();
            res.json({msg:'Reviews Succefully Upadte',flag:true})
        }  else{
            CompanyProfile.create({
                reviews:reviews,
                userId:userId,
            }).then((user)=>{
                if(user){
                    res.json({msg:'Reviews Created Succefully ',flag:true})
                }                
            })
        }
    })
}
// Close Rating


// Portfolio
exports.companyPortfolio=async (req,res,next)=>{
    console.log('companyPortfolio');
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    
    const {companyId}=req.params;

    const {title}=req.body;
    const {filename}=req.file;

    CompanyProfile.findOneAndUpdate({companyId:companyId},{$push:{"portfolio":{title:title,file:filename}}},
    (error, success)=>{
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    })
}
// Close Porfolio


// Rate
exports.companyrate=(req,res,next)=>{
    console.log('rate')
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }


    const {rate}=req.body;
    const {companyId}=req.params;
    console.log(rate)
    CompanyProfile.findOne({companyId:mongoose.Types.ObjectId(companyId)})
    .then((companyprofile)=>{
        if(companyprofile){ 

            companyprofile.rate=rate,
            companyprofile.save();
            res.json({msg:'Updated Succefully Portfolio',flag:true});

        }else{

            CompanyProfile.create({
                rate:rate,
                companyId:companyId,
            }).then((profile)=>{        
                if(profile){
                    res.json({msg:'Created Succefully Portfolio',flag:true})
                }
            })
        }
    })
}
// Close Rate




// This section is employee called client 

exports.getemployee=(req,res,next)=>{
    console.log('employee')
    console.log(req.params)
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    let {employeeId}=req.params;
    
    Employee.findOne({_id:mongoose.Types.ObjectId(employeeId)})
    .populate('userId')
    .then((employee)=>{
        if(employee){
            res.json(employee)       
        }
    })
}

exports.updatename=(req,res,next)=>{
    console.log("user")
    console.log(req.params);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    const {userId}=req.params;
    const {name} =req.body;

    let [firstname,...lastname]=name.split(" ");
    lastname=lastname.toString().replaceAll(',','')


     User.updateOne({_id:mongoose.Types.ObjectId(userId)},{$set:{firstname:firstname,lastname:lastname}})
    .then((employee)=>{

        if(employee.acknowledged){
            console.log('ud')
            res.json({msg:'updated Succefully',flag:true})
        }
    })
}

exports.emppicture=(req,res,next)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    let {employeeId}=req.params;
    const file=req.file;
    console.log(file)
    Employee.findOne({_id:mongoose.Types.ObjectId(employeeId)})
    .then((employee)=>{        
        if(employee){
            employee.picture=file.filename;
            employee.save();
            res.json({msg:'Upload  Succefully',flag:true})
        }
    })
}



// Employee Company Details
exports.companyDetail=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    console.log(req.params);
   const {employeeId}=req.params;
   const {companyName}=req.body;

   Employee.findOne({_id:mongoose.Types.ObjectId(employeeId)})
   .then((employee)=>{
        if(employee){
            employee.companyName=companyName;
            employee.save();
            res.json({msg:'Updated  Succefully',flag:true})
        }else{
            Employee.create({
                companyName:companyName,
                employeeId:employeeId,
            })
            .then(profile=>{
                if(profile){
                  res.json({msg:'Created Succefully Client',flag:true})
                }
            })
        }
   })

}
// Close Company Details


// Company Contacts
exports.companycontact=(req,res,next)=>{
    console.log('contact')
    console.log(req.body)

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }

    const {employeeId}=req.params;
    const {phone,country,ownerName}=req.body;


    Employee.updateOne({_id:mongoose.Types.ObjectId(employeeId)},{$set:{phone:phone,country:country,ownerName:ownerName}})
    .then((employee)=>{
        if(employee.acknowledged){
            console.log('ud')
            res.json({msg:'updated Succefully',flag:true})
        }
    })
}
// Close Company Contact]




// Freelancerlist
exports.freelancerlist=(req,res,next)=>{
    console.log(req.params)
    const {companyId}=req.params;
    User.find({companyId:mongoose.Types.ObjectId(companyId),userType:'freelancer',authorize:false})
    .then((freelancers)=>{
        res.status(200).json({freelancers:freelancers})
    })
}

exports.approveFreelancer=(req,res,next)=>{
    console.log(req.params)
    const {companyId}=req.params;
    User.find({companyId:mongoose.Types.ObjectId(companyId),userType:'freelancer',authorize:true})
    .then((freelancers)=>{
        res.status(200).json({freelancers:freelancers})
    })
}
exports.approve=(req,res,next)=>{
    const {freelancerId}=req.body;
    User.updateOne({_id:mongoose.Types.ObjectId(freelancerId)},{$set:{authorize:true}})
    .then((response)=>{
        if(response.acknowledged){
            res.json({msg:'Succefully Update',flag:true});
        }
    })
}

exports.reject=(req,res,next)=>{
    const {freelancerId}=req.body;
    User.updateOne({_id:mongoose.Types.ObjectId(freelancerId)},{$set:{companyId:null}})
    .then((response)=>{
        console.log(response)
        if(response.acknowledged){
            
            res.json({msg:'Succefully Update',flag:true});
        }
    })
}

