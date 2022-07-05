const Mongoose=require('mongoose');
const mongoose=Mongoose.connect('mongodb://localhost:27017/orgo');
module.exports=mongoose;