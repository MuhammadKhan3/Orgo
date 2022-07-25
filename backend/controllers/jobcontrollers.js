const Jobs = require("../model/job");
const mongoose=require('mongoose')
const fs = require('fs');
const favJob = require("../model/favJobs");
const {validationResult}=require('express-validator');
const Searches = require("../model/search");




exports.createJob=(req,res,next)=>{
    console.log('create-job')
    console.log(req)

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }
    console.log('create-job')

    const {employeeId}=req.params;
    const file=req.files.map(value=>{
        return value;
    });
    console.log(file)

    const {heading,description,category,skill,scope,budget}=req.body;
    console.log(budget)
    
  
    Jobs.create({
        heading:heading,
        description:description,
        category:category,
        file:file,
        skills:skill,
        scope:scope,
        budget:budget,
        employeeId:employeeId,
    }).then(job=>{
        console.log(job)
        if(job){
            res.json({msg:'Created Succefully Job',flag:true,jobId:job._id})
        }

    }).catch((error)=>{
        const err=new Error('Create job Issue')
        err.data=error;
        throw err;
    })
}



exports.updateJob=(req,res,next)=>{

    const {jobId}=req.params;
    const {heading,description,category,skills,scope,budget,deletefile}=req.body;
    
    let {files}=req.body

// Add file
    if(req.files.length>0){
        req.files.map((value)=>{
            files.push(value.filename)
        })

    }
// Close file
   // Delete the file   
   console.log(deletefile.length) 
    if(deletefile.length>0)
    {
        console.log('delte')
        deletefile.forEach((value)=>{

            fs.unlink(`images/job/${value}`, (err => {
                if (err) console.log(err);
                else {
                console.log("Deleted file: image.jpg");
                }
            }));
        })
    }
    // Close the File
    console.log('files',files)
    Jobs.updateOne({
        _id:mongoose.Types.ObjectId(jobId),
    },{$set:{
        heading:heading,
        description:description,
        category:category,
        file:files,
        skills:skills,
        scope:scope,
        budget:budget,
    }}).then(job=>{
        console.log('job',job)
        if(job){
            res.json({msg:'Updated Succefully User',flag:true,jobId:job._id})
        }

    }).catch((error)=>{
        const err=new Error('Create job Issue')
        err.data=error;
        throw err;
    })
}



exports.getJob=(req,res,next)=>{
    console.log("job")
    const {jobId}=req.params;
    Jobs.findOne({$and:[
        {_id:mongoose.Types.ObjectId(jobId)},
        {status:'active'}
    ]})
    .select("-status")
    .populate({
        path:'employeeId',
        populate:{
            path:'userId',
            model:'user'
        }
    })
    .then((job)=>{
        if(job){
            res.json({job:job,flag:true,msg:'Succefully Fetch Jobs'});
        }else{
            res.json({flag:false,msg:'Not Fetch Jobs'});
        }
    }).catch((error)=>{
        const err=new Error('Create job Issue')
        err.data=error;
        throw err;
    })
}

exports.getJobs=(req,res,next)=>{
    console.log('hi')
    Jobs.find({status:'active'})
    // .populate('userId')
    // .populate('employeeId')
    .then(jobs=>{
        console.log(jobs)
        if(jobs){
            res.json({jobs:jobs,searches:req.searches,flag:true,msg:'Succefully Fetch Jobs'});
        }
    })


}

exports.searchlist=(req,res,next)=>{
    const {userId}=req.body;
    Searches.find({userId:userId})
    .then((searches)=>{
        req.searches=searches;
        next();
    })
}


exports.FavJob=(req,res,next)=>{
    console.log('favourit.')
    const {userId}=req.body;
    const {jobId}=req.params;
    console.log(jobId,userId)

    favJob.findOne({$and:[
        {jobId:mongoose.Types.ObjectId(jobId)},
        {userId:mongoose.Types.ObjectId(userId)}
    ]})
    .then((job)=>{
        if(job){
            console.log('already')
            res.json({msg:"Already Added",flag:true})
        }else{
            console.log('not exist')

            favJob.create({
                userId:userId,
                jobId:jobId
            }).then((favjob)=>{
                if(favjob){
                    res.json({flag:true,msg:'Succefully added'});        
                }
            })
        }
    }).catch((error)=>{
        const err=new Error('Favourite job add issue')
        err.data=error;
        throw err;
    })

}

exports.getfavJob=(req,res,next)=>{
    const {userId}=req.body;
    console.log(userId);
    
    favJob.find({userId:mongoose.Types.ObjectId(userId)})
    .then((favjob)=>{
        const id=favjob.map((value)=>{
            return value.jobId;
        })
        Jobs.find({_id:id})
        .then((jobs)=>{
            console.log(jobs)
            res.json({jobs:jobs,flag:true,msg:'Succefull Fetched'});
        })
    })
}






exports.bestmatchJob=(req,res,next)=>{
    const {userId}=req.body;
    Searches.find({userId:userId})
    .select('-userId')
    .select('-_id')
    .select('-__v')
    .then(searches=>{
        const search=searches.map((value,i)=>{
            return value.search;
        })
        Jobs.find({$text:{$search:search.toString()}})
        .then((jobs)=>{
            if(jobs){
                res.json({searches:req.searches,jobs:jobs,msg:'Succesfully Fetched',flag:true})
            }else{
                res.json({msg:'Not Found the jobs',flag:false})

            }
        })
    })
}
exports.searchJob=(req,res,next)=>{
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }

    const {search}=req.body;
    const {userId}=req.body;
    console.log(search,userId)
    Jobs.find({$text:{$search:search},status:"active"})
    .then((jobs)=>{
        console.log('job',jobs)
        if(jobs){
            console.log(jobs)
            Searches.find({userId:mongoose.Types.ObjectId(userId)}, function(err, count) {
            console.log("count",count.length)
                if(count.length<5){
                    console.log('1')
                    Searches.create({
                        userId:userId,
                        search:search
                    }).then(()=>{
                        res.json({jobs:jobs,msg:'Succefully Fetched'})
                    })
                }else{
                    console.log('2')
                    Searches.updateOne({userId:mongoose.Types.ObjectId(userId)},{$set:{search:search}})
                    .then((search)=>{
                        console.log(search)
                        if(search.acknowledged){
                            res.json({jobs:jobs,msg:'Succefully Fetched',flag:true})
                        }
                    })
                }
              });
        }else{
            res.json({jobs:jobs,msg:'Jobs Not found',flag:true})
        }
    })

}
