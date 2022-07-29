const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const chat=new Schema({
    receiveId:{
        type:Schema.Types.ObjectId,ref:'user',
        required:true
    },
    sendId:{
        type:Schema.Types.ObjectId,ref:'user',
        required:true,
    },
    message:{
        type:String,
    },
    file:{
        type:String,
    },
    companyprofile:{
        type:Schema.Types.ObjectId,ref:'companyprofile',

    },
    employeeprofile:{
        type:Schema.Types.ObjectId,ref:'employee',
    }
},{timestamps:true})

const Chat=mongoose.model('chat',chat);
module.exports=Chat;