const mongoose=require('mongoose');
const Schema=mongoose.Schema;


// Employee Profile Schema
const companyProfile= new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    picture:{
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
        type:Number,
    },
    education:{
        type:Array,
    },
    // reviews:{
    //     type:[{
    //         value:Schema.Types.Decimal128,
    //         description:String,
    //         userId:[{type:Schema.Types.ObjectId,ref:'user'}]
    //     }],
    // },
    userId:{type:Schema.Types.ObjectId,ref:'user'},
    companyId:{type:Schema.Types.ObjectId,ref:'company'}
})
const CompanyProfile=mongoose.model('companyprofile',companyProfile);
module.exports=CompanyProfile;