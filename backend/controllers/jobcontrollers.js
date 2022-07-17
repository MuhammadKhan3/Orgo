const Jobs = require("../model/job");
const mongoose=require('mongoose')
const fs = require('fs');
const favJob = require("../model/favJobs");
const {validationResult}=require('express-validator');
const NodeGeocoder = require('node-geocoder');

// Start GeoCoding
const options = {
    provider: 'google',
  
    // Optional depending on the providers
    apiKey: 'AIzaSyAicYwQPXl18yNg2lhY23XEDRlFm4icjW4', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };

  const geocoder = NodeGeocoder(options);
//   const response = await geocoder.reverse({ lat: 29.9807, lon: 71.8868 });
//   console.log(response)
// Close GeoCoding
exports.createJob=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const err=new Error('Information Profile')
        err.statusCode=500;
        err.data=errors.array();
        throw err;
    }

    const {employeeId}=req.params;
    const file=req.files.map(value=>{
        return value.filename
    });
    const {headline,description,category,skills,scope,budget}=req.body;
    Jobs.create({
        headline:headline,
        description:description,
        category:category,
        file:file,
        skills:skills,
        scope:scope,
        budget:budget,
        employeeId:employeeId,
        status:'pending',
    }).then(job=>{
        
        if(job){
            res.json({msg:'Created Succefully User',flag:true,jobId:job._id})
        }

    }).catch((error)=>{
        const err=new Error('Create job Issue')
        err.data=error;
        throw err;
    })
}



exports.updateJob=(req,res,next)=>{

    const {jobId}=req.params;
    const {headline,description,category,skills,scope,budget,deletefile}=req.body;
    
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
        headline:headline,
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

exports.getJobs=async (req,res,next)=>{
    
    Jobs.find({status:'active'})
    .populate('userId')
    .then(jobs=>{
        console.log(jobs)
        if(jobs){
            res.json({jobs:jobs,flag:true,msg:'Succefully Fetch Jobs'});
        }
    })


}


exports.FavJob=(req,res,next)=>{
    const {userId,jobId}=req.body;
    Jobs.findOne({jobId:mongoose.Types.ObjectId(jobId)})
    .then((job)=>{
        if(job){
            res.json({msg:"Already Add",flag:true})
        }else{
            favJob.create({
                userId:userId,
                jobId:jobId
            }).then((favjob)=>{
                if(favjob){
                    res.json({flag:true,msg:'Succefully added '});
        
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
    favJob.find()
    .populate('userId')
    .populate('jobId')
    .then((favjob)=>{
        res.json({FavouriteJob:favjob,flag:true,msg:'Succefull Fetched'});
    })
}

exports.searchJob=(req,res,next)=>{
    const {search}=req.body;
    Jobs.find({$text:{$search:search}})
    .then((jobs)=>{
        res.json({jobs:jobs,msg:'Succefully Fetched',flag:true});
    })
}
