const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var now = new Date(),
    utcDate =now.toUTCString();

const Job=new mongoose.Schema({
    heading:{
        type:String,
        lowercase: true
    },
    description:{
        type:String,
        required:true,
        lowercase: true
    },
    file:{
        type:Array,
    },
    category:{
        type:String,
        lowercase: true
    },
    status:{
        type:String,
        default:'pending',
    },
    proposal:{
        type:Number,
        default:0,
    },
    skills:{
        type:Array,
        lowercase: true
    },
    scope:
    {
            projectLevel:String,
            duration:String,
    },
    budget:{
            max:{
                type:String
            },
            min:{
                type:String
            },
    },
    userId:{type:Schema.Types.ObjectId,ref:'user'},
    employeeId:{type:Schema.Types.ObjectId,ref:'employee'},
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    // {
    //     // type:Date,
    //     date:{
    //     type:Date,
    //     default:new Date()
    //     },
    //     offset:{
    //         type:Date,
    //         default:new Date().getTimezoneOffset()
    //     },
    // }
})

Job.index({'$**': 'text'});
const Jobs=mongoose.model('job',Job);
module.exports=Jobs;