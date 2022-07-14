const mongoose=require('mongoose');

// User Schema
const Users = new mongoose.Schema({
    firstname: {
        type:String,
        required:true,
    },
    lastname:{
        type:String,
    },
    password:{
        type:String,
    },
    email:{
        type:String,
        required:true,
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
    profile:{
        type:String,
        default:'',
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