const mongoose=require('mongoose');

const Users = new mongoose.Schema({
    firstname: {
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true
    },
    Date:{
        type:Date,
        default:Date.now,
    },
    userType:{
        type:String,
    },
    verified:{
        type:Boolean,
        default:false,
    },
    verificationCode:{
        type:String,
    },
    google:{
        type:String,
        default:''
    },
    facebook:{
        type:String,
        default:''
    },
  })
  const User=mongoose.model('user',Users);
  module.exports=User;