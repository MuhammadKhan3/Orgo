const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Job=new mongoose.Schema({
    headline:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    file:{
        type:Array,
        required:true,
    },
    category:{
        type:String,
    },
    status:{
        type:String,
    },
    skills:{
        type:Array,
    },
    scope:
        {
            projectLevel:String,
            duration:String,
        },
    budget:{
            max:Number,
            min:Number,
    },
    userId:{type:Schema.Types.ObjectId,ref:'user'},
    createdAt:{
        type:Date,
        default:new Date().toUTCString(),
    }
})

Job.index({'$**': 'text'});
const Jobs=mongoose.model('job',Job);
module.exports=Jobs;