const Mongoose=require('mongoose');
// Db Connection
const mongoose=Mongoose.connect('mongodb://localhost:27017/orgo');
module.exports=mongoose;