const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const proposals=new Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:'company'},
    jobId:{type:mongoose.Schema.Types.ObjectId,ref:'job'},
    rate:{
        type:Number,
        required:true,
    },
    hire:{
        type:Boolean,
        default:false,
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