const Proposals = require('../model/proposal');
const Job= require('../model/job');

const mongoose=require('mongoose');
const CompanyProfile = require('../model/companyProfile');

exports.createProposal=(req,res,next)=>{
    console.log('proposal')
    const jobId=req.params.jobId;
    const {file}=req;


    const {rate,coverletter,companyId,userId}=req.body;
    
    Proposals.findOne({$and:[{companyId:mongoose.Types.ObjectId(companyId)},{jobId:mongoose.Types.ObjectId(jobId)}]})
    .then((proposal)=>{
        if(proposal){
            res.json({msg:'Already submit proposal',flag:false})
        }else{
            Job.updateOne({_id:mongoose.Types.ObjectId(jobId)},{$inc:{proposal:1}})
            .then(()=>{
                Proposals.create({
                    rate:rate,
                    userId:userId,
                    coverletter:coverletter,
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
            })
        }
    }).catch((error)=>{
        const err=new Error('Proposal issue');
        err.data=error;
        throw error;
    })
}


exports.getProposal=(req,res,next)=>{
    const {jobId}=req.params;
    Proposals.find({jobId:mongoose.Types.ObjectId(jobId)})
    .populate('userId')
    .then((proposals)=>{
        const companyId=proposals.map((proposal)=>{
            return mongoose.Types.ObjectId(proposal.companyId) ;
        })
        CompanyProfile.find({companyId:companyId})
        .populate('companyId')
        .then((profile)=>{
            const proposal=proposals.map((propos,i)=>{
                return [propos,profile[i]];
            })
            res.json({proposal})
        })
       
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