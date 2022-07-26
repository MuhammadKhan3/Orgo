const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const proposals=new Schema({
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    freelancerId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    jobId:{type:mongoose.Schema.Types.ObjectId,ref:'job'},
    rate:{
        type:Number,
        required:true,
    },
    coverletter:{
        type:String,
    },
    file:{
        type:Array,
    }
})

const Proposals=mongoose.model('proposal',proposals);
module.exports=Proposals;