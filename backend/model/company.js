const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const company=new Schema({
    companyName:{
        type:String,
        lowercase: true,
        unique:true,
    },
    country:{
        type:String,
    },
    timezone:{
        type:String,
    }
})

const Company=mongoose.model('company',company);
module.exports=Company;