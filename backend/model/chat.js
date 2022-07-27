const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const chat=new Schema({
    receiveId:{
        type:Schema.Types.ObjectId,ref:'user',
        required:true
    },
    sendId:{
        type:Schema.Types.ObjectId,ref:'company',
        required:true,
    },
    msg:{
        type:String,
    },
    file:{
        type:String,
    }
})

const Company=mongoose.model('chat',chat);
module.exports=Company;