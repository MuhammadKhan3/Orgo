const mongoose=require('mongoose');
const {Schema}=mongoose

// User Schema
const Search= new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true,

    },
    search:{
        type:String,
        required:true,
    }
  })
  const Searches=mongoose.model('search',Search);
  module.exports=Searches;