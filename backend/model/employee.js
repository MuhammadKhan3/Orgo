const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const employee=new mongoose.Schema({
    ownerName:{
        type:String,
        default:''
    },
    companyName:{
        type:String,
        default:''
    },
    companyDescription:{
        type:String,
        default:''
    },
    phone:{
        type:String,
        default:'0324xxxxxxx'
    },
    userId:{type:Schema.Types.ObjectId,ref:'user'},
    phone:{
        type:String,
        default:''
    },
    country:{
        type:String,
        default:''
    },
    timezone:{
        type:String,

    },
    picture:{
        type:String,
        default:''
    },
})

employee.index({'$**': 'text'});
const Employee=mongoose.model('employee',employee);
module.exports=Employee;