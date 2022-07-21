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
    console.log(file)
    CompanyProfile.updateOne({companyId:mongoose.Types.ObjectId(companyId)},{$set:{picture:file.filename}})
    .then((update)=>{
        if(update){
            res.json({msg:'Upload  Succefully',flag:true})
        }
    })
}


// Close User Profile

// Freelancing title and description 
exports.freeinformation=(req,res,next)=>{    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }

    const {title,description}=req.body
    const userId=req.params.userId;

    CompanyProfile.findOne({userId:mongoose.Types.ObjectId(userId)}).then((user)=>{
        if(user){
            user.title=title;
            user.description=description;
            user.save();
            res.json({flag:true,msg:' Succefully Updated'})
        }else{
            CompanyProfile.create({
                title:title,
                description:description,
                userId:userId,
            }).then((employee)=>{
                if(employee){
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
exports.freeskills=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    
    const userId=req.params.userId;
    const {skills}=req.body
    CompanyProfile.findOne({id:id}).then((user)=>{
        if(user){
            user.skills=skills;
            user.save();
            res.json({msg:'Siklls Succefully Upadte',flag:true})
        }  else{
            CompanyProfile.create({
                skills:skills,
                userId:userId,
            }).then((user)=>{
                if(user){
                    res.json({msg:'Created Succefully ',flag:true})
                }                
            })
        }
    })
}
// close Skills

// Start Languages
exports.companylanguages=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }

    const companyId=req.params.companyId;
    const {language,level}=req.body
    console.log('lang')
    var languages=language.map((lang,i)=>{
        return {language:lang,level:level[i]}
    })

    CompanyProfile.findOne({companyId:mongoose.Types.ObjectId(companyId)})
    .then((companyprofile)=>{
        languages=companyprofile.languages.concat(languages)
        if(companyprofile){
            companyprofile.languages=languages;
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
exports.freePortfolio=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    
    const id=req.params.userId;
    const {title}=req.body;
    const images=req.files.map((file)=>{
        return file.filename;
    })

    CompanyProfile.findOne({id:id}).then((user)=>{
        if(user){
            console.log('update')
            console.log(user.portfolio.concat({title:title,images:images}))
            user.portfolio=user.portfolio.concat({title:title,images:images});
            user.save();
            res.json({msg:'Updated Succefully Portfolio',flag:true});

        }else{
            CompanyProfile.create({
                portfolio:[{title:title,images:images}],
                id:id,
            }).then((profile)=>{
            
                if(user){
                    res.json({msg:'Created Succefully Portfolio',flag:true})
                }
            })
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


exports.ClientuploadProfile=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }

    let {userId}=req.params;
    const file=req.file;
    console.log(userId)
    User.findOne({_id:mongoose.Types.ObjectId(userId)})
    .then((user)=>{        
        if(user){
            user.picture=file.filename;
            user.save();
            res.json({msg:'Upload  Succefully',flag:true})
        }
    })
}



// Company Details
exports.companyDetail=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    // 

   const {userId}=req.params;
   const {companyName,companyDescription}=req.body;
   Employee.findOne({userId:mongoose.Types.ObjectId(userId)})
   .then((user)=>{
        if(user){
            user.companyName=companyName;
            user.companyDescription=companyDescription;
            user.save();
            res.json({msg:'Updated  Succefully',flag:true})

        }else{
            Employee.create({
                companyName:companyName,
                companyDescription:companyDescription,
                userId:userId,
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
exports.clicontacts=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    // console.log('cient contacts')
    const {userId}=req.params;
    const {phone,address}=req.body;


    Employee.findOne({userId:mongoose.Types.ObjectId(userId)})
    .then((user)=>{
        if(user){
            user.phone=phone;
            user.address=address;
            user.save();
            res.json({msg:'Updated Succefully',flag:true})
        }else{
            Employee.create({
                phone:phone,
                address:address,
                userId:userId,
            }).then((profile)=>{
                if(profile){
                  res.json({msg:'Created Succefully',flag:true})
                }
            })
        }

    })
}
// Close Company Contact