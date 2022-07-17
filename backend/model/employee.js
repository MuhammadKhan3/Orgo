const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const employee=new mongoose.Schema({
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

const Employee=mongoose.model('employee',employee);
module.exports=Employee;