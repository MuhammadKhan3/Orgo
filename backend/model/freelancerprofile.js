const mongoose=require('mongoose');
const Schema=mongoose.Schema;


// Employee Profile Schema
const flProfile= new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    skills:{
        type:Array,
    },
    languages:{
        type:Array,
        default:'[]'
    },
    portfolio:{
        type:[{
            title:String,
            images:Array
            }],
        default:[],
    },
    rate:{
        time:String,
        price:Number,
    },
    education:{
        type:Array,
    },
    reviews:{
        type:[{
            value:Schema.Types.Decimal128,
            description:String,
            id:[{type:Schema.Types.ObjectId,ref:'user'}]
        }],
    },
    id:{type:Schema.Types.ObjectId,ref:'user'}
})
  const FlProfile=mongoose.model('flprofile',flProfile);
  module.exports=FlProfile;