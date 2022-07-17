const mongoose=require('mongoose');

const FavJobs=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    jobId:{type:mongoose.Schema.Types.ObjectId,ref:'job'},
})

const favJob=mongoose.model('favjobs',FavJobs);
module.exports=favJob;