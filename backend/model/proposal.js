const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const proposals=new Schema({
    frltId:{type:Schema.Types.ObjectId,ref:'flprofile'},
    jobId:{type:Schema.Types.ObjectId,req:'job'},
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