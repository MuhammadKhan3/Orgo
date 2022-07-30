const mongoose=require('mongoose');

const hire=new mongoose.Schema({
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:'company'},
    companyproId:{type:mongoose.Schema.Types.ObjectId,ref:'companyprofile'},
    employeeId:{type:mongoose.Schema.Types.ObjectId,ref:'employee'},
    proposalId:{type:mongoose.Schema.Types.ObjectId,ref:'proposal'},
    jobId:{type:mongoose.Schema.Types.ObjectId,ref:'job'},
    addresses:Object,
    amount:Number,
    token:Object,
},{timestamps:true})

const Hire=mongoose.model('hire',hire);
module.exports=Hire;