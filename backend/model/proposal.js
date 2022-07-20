const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const proposals=new Schema({
    freelancerId:{type:Schema.Types.ObjectId,ref:'freelancer'},
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