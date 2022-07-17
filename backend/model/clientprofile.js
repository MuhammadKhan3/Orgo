const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const clientProfile=new mongoose.Schema({
    name:{
        type:String,
    },
    companyName:{
        type:String,
    },
    companyDescription:{
        type:String,
    },
    userId:{type:Schema.Types.ObjectId,ref:'user'},
    phone:{
        type:String,
    },
    picture:{
        type:String,
    },
    address:{
        type:String,
    }
})

const ClientProfile=mongoose.model('clientprofile',clientProfile);
module.exports=ClientProfile;