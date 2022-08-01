const mongoose=require('mongoose');
const {Schema}=mongoose

// User Schema
const review= new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    employeerId:{
        type:Schema.Types.ObjectId,
        ref:'employee',
        required:true,
    },
    companyId:{
        type:Schema.Types.ObjectId,
        ref:'company',
        required:true,
    },
    description:{
        type:String,
    },
    rating:{
        type:Number,
    }
})
const Reviews=mongoose.model('review',review);
module.exports=Reviews;