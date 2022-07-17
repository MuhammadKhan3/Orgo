const FlProfile = require("../model/freelancerprofile");
const User = require("../model/users")
const mongoose=require('mongoose')
const { validationResult } = require('express-validator');
const ClientProfile = require("../model/clientprofile");




exports.empgetprofile=(req,res,next)=>{
    let id=req.params.userId;
    console.log(id)
    id=mongoose.Types.ObjectId(id);
    FlProfile.findOne({id:id}).populate('id').then((user)=>{
        res.json(user);
    })
}


exports.empuploadProfile=(req,res,next)=>{
    console.log('profile')
    let {userId}=req.params;
    const file=req.file;
    console.log(userId)
    console.log(file);

    User.updateOne({_id:mongoose.Types.ObjectId(userId)},{$set:{picture:file.filename}})
    .then((update)=>{
        if(update){
            res.json({msg:'Upload  Succefully',flag:true})
        }
    })
}

// Employee title and description 
exports.empinformation=(req,res,next)=>{    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }


    const {title,description}=req.body
    const id=req.params.userId;

    FlProfile.findOne({id:id}).then((user)=>{
        if(user){
            user.title=title;
            user.description=description;
            user.save();
            res.json({flag:true,msg:' Succefully Updated'})
        }else{
            FlProfile.create({
                title:title,
                description:description,
                id:id,
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
// close title and description in employee


// Skills
exports.empskills=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    
    const id=req.params.userId;
    const {skills}=req.body
    FlProfile.findOne({id:id}).then((user)=>{
        if(user){
            user.skills=skills;
            user.save();
            res.json({msg:'Siklls Succefully Upadte',flag:true})
        }  else{
            FlProfile.create({
                skills:skills,
                id:id,
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
exports.emplanguages=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }

    const id=req.params.userId;
    const {languages}=req.body
    FlProfile.findOne({id:id}).then((user)=>{
        if(user){
            user.languages=languages;
            user.save();
            res.json({msg:'Languages Succefully Upadte',flag:true})
        }  else{
            FlProfile.create({
                languages:languages,
                id:id,
            }).then((user)=>{
                if(user){
                    res.json({msg:'Created Succefully ',flag:true})
                }                
            })
        }
    })
}
// close Languages


// Education
exports.education=(req,res,next)=>{
    const id=req.params.userId;
    const {education}=req.body;

    FlProfile.findOne({id:id}).then((user)=>{
        
        if(user){
            user.education=education;
            user.save();
            res.json({msg:'education Succefully Upadte',flag:true})
        }else{
            FlProfile.create({
                education:education,
                id:id,
            }).then((user)=>{
                if(user){
                    res.json({msg:'Created Succefully',flag:true})
                }                
            })
        }

    })
}
// Close Education


// Rating
exports.empReviews=(req,res,next)=>{

    const id=req.params.userId;
    const {reviews}=req.body;
    const review=reviews.filter((value)=>{
        return String(value.id)!==String(id);
    })
    
    // console.log(reviews);
    FlProfile.findOne({id:id}).then((user)=>{
        if(user){
            user.reviews=reviews;
            user.save();
            res.json({msg:'Reviews Succefully Upadte',flag:true})
        }  else{
            FlProfile.create({
                reviews:reviews,
                id:id,
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
exports.empPortfolio=async (req,res,next)=>{
    
    const id=req.params.userId;
    const {title}=req.body;
    const images=req.files.map((file)=>{
        return file.filename;
    })

    FlProfile.findOne({id:id}).then((user)=>{
        if(user){
            console.log('update')
            console.log(user.portfolio.concat({title:title,images:images}))
            user.portfolio=user.portfolio.concat({title:title,images:images});
            user.save();
            res.json({msg:'Updated Succefully Portfolio',flag:true});

        }else{
            FlProfile.create({
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
exports.emprate=(req,res,next)=>{
    const {price,time}=req.body;
    const id=req.params.userId;

    FlProfile.findOne({id:id}).then((user)=>{
        if(user){
            
            console.log('update')
            user.rate={price:price,time:time},
            user.save();
            res.json({msg:'Updated Succefully Portfolio',flag:true});

        }else{

            FlProfile.create({
                rate:{price:price,time:time},
                id:id,
            }).then((profile)=>{        
                if(user){
                    res.json({msg:'Created Succefully Portfolio',flag:true})
                }
            })
        }
    })


}
// Close Rate

// Client Profile..............

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
// close Client Profile........

// Company Details
exports.companyDetail=(req,res,next)=>{
   const {userId}=req.params;
   const {companyName,companyDescription}=req.body;
   ClientProfile.findOne({userId:mongoose.Types.ObjectId(userId)})
   .then((user)=>{
        if(user){
            user.companyName=companyName;
            user.companyDescription=companyDescription;
            user.save();
            res.json({msg:'Updated  Succefully',flag:true})

        }else{
            ClientProfile.create({
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
    // console.log('cient contacts')
    const {userId}=req.params;
    const {phone,address}=req.body;


    ClientProfile.findOne({userId:mongoose.Types.ObjectId(userId)})
    .then((user)=>{
        if(user){
            user.phone=phone;
            user.address=address;
            user.save();
            res.json({msg:'Updated Succefully',flag:true})
        }else{
            ClientProfile.create({
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