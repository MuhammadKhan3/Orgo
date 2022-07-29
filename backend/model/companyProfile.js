const mongoose=require('mongoose');
const Schema=mongoose.Schema;


// Employee Profile Schema
const companyProfile= new mongoose.Schema({
    title:{
        type:String,
        default:'Dumy title'

    },
    description:{
        type:String,
        default:'Dumy description'

    },
    picture:{
        type:String,
        default:''

    },
    skills:{
        type:String,
        default:''
    },
    languages:{
        type:[{
            languages:String,
            level:String,
        }],
        default:[]
    },
    hourworking:{
        type:String,
        default:''
    },
    portfolio:{
        type:[{
            title:String,
            file:String
            }],
        default:[],
    },
    rate:{
        type:Number,
        default:0,
    },
    education:{
            school:{
                type:String,
                default:''
            },
            degreelevel:{
                type:String,
                default:''
            },
            degree:{
                type:String,
                default:''
            },
            description:{
                type:String,
                default:''
            },
    },
    companyName:{
        type:String,
        default:'',
        lowercase:true,
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

companyProfile.index({'$**': 'text'});
const CompanyProfile=mongoose.model('companyprofile',companyProfile);
module.exports=CompanyProfile;