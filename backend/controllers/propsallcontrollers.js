const Proposals = require('../model/proposal');
const mongoose=require('mongoose');

exports.createProposal=(req,res,next)=>{
    const jobId=req.params.jobId;
    const file=req.files.map((file)=>{
        return file;
    })

    const {rate,coverletter,companyId,freelancerId}=req.body;
    
    Proposals.findOne({$and:[{companyId:mongoose.Types.ObjectId(companyId)}]})
    .then((proposal)=>{
        if(proposal){
            res.json({msg:'Already submit proposal',flag:false})
        }else{
            Proposals.create({
                rate:rate,
                coverletter:coverletter,
                freelancerId:freelancerId,
                companyId:companyId,
                jobId:jobId,
                file:file
            }).then(proposal=>{
                if(proposal){
                  res.json({msg:'Submit Proposal',flag:true})
                }
            }).catch((error)=>{
                const err=new Error('Create Proposal issue');
                err.data=error;
                throw error;
            })
        }
    }).catch((error)=>{
        const err=new Error('Proposal issue');
        err.data=error;
        throw error;
    })
}


exports.getProposal=(req,res,next)=>{
    console.log('getproposal')
    const {jobId}=req.params;
    console.log(jobId)
    Proposals.find({jobId:mongoose.Types.ObjectId(jobId)})
    .populate({
        path:'companyId',        
    })
    .then((proposals)=>{
        res.json({proposals:proposals,msg:'Succefully Fetch Proposal',flag:true});
    }).catch((error)=>{
        const err=new Error('Get Proposal Error')
        err.statusCode=500;
        err.data=error;
        throw err;
    })
}

exports.numberProposal=(req,res,next)=>{
    const {jobId}=req.params
    Proposals.countDocuments({jobId:mongoose.Types.ObjectId(jobId)})
    .then((proposal)=>{
        res.json({prop_length:proposal,msg:'Succefully Fetched',flag:true});
    })
}