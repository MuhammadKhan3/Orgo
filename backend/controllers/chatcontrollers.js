const Chat=require('../model/chat');
const mongoose=require('mongoose');
const User = require('../model/users');
const CompanyProfile = require('../model/companyProfile');
const Employee = require('../model/employee');

exports.messagelist=(req,res,next)=>{
    const {userType,sendId,receiveId}=req.body;
    
    if(userType==='company' || userType==='freelancer'){
        const {companyId}=req.body;
        User.findOne({companyId:companyId})
        .then((user)=>{
            Chat.find({$or:[{receiveId:receiveId,sendId:user._id},{receiveId:user._id,sendId:receiveId}]})
            .populate({
                path:'companyprofile',
                populate:{
                    path:'companyId',
                    model: 'company'
                }
            })
            .populate('employeeprofile')
            .then((chat)=>{
                res.json(chat)
            })
        })
    }else{
        Chat.find({$or:[{receiveId:receiveId,sendId:sendId},{receiveId:sendId,sendId:receiveId}]})
        .populate('employeeprofile')
        .populate({
            path:'companyprofile',
            populate:{
                path:'companyId',
                model: 'company'
            }
        })
        .then((chat)=>{
            res.json(chat)
        })
    }

}



exports.userlist=(req,res,next)=>{
    console.log(req.body)
    const {userId,userType}=req.body;

    if(userType==='company' || userType==='freelancer'){
     const {companyId}=req.body;
     User.findOne({companyId:companyId,userType:'company'})
     .then((user)=>{
        console.log('user',user)
        Chat.find({receiveId:user._id})
        .distinct('sendId')
        .then((chat)=>{
            console.log(chat)
            User.find({_id:chat})
            .then((user)=>{
                const userId=user.map((u)=>{
                    return u._id;
                })
                Employee.find({userId:userId})
                .then((profile)=>{
                    res.json({userlist:profile,user:user,msg:'succefully fetched'})
                })
            })
        })
     })
    }else{
        Chat.find({sendId:userId})
        .distinct('receiveId')
        .then((chat)=>{
            User.find({_id:chat})
            .then((user)=>{
                // res.json(user)
                const companyId=user.map((u)=>{
                    return u.companyId
                })
                CompanyProfile.find({companyId:companyId})
                .populate('companyId')
                .then((profile)=>{
                    res.json({userlist:profile,user:user,msg:'succefully fetched'})
                })
            })
        })
    }
}

exports.search=async(req,res,next)=>{
    const {userId,userType,key}=req.body;
    
    if(userType==='company' || userType==='freelancer'){
     const {companyId}=req.body;
     User.findOne({companyId:companyId,userType:'company'})
     .then((user)=>{
        Chat.find({receiveId:user._id})
         .populate({
            path:'companyprofile',
            match:{
                companyName:key
            }
         })
        .then((chat)=>{
            res.json(chat)
            // res.json({userlist:profile,user:user,msg:'succefully fetched'})
        })
     })
    }else{
        // Chat.aggregate([
        //     {$lookup:{
        //         from:'employee',
        //         localField:'employeeprofile',
        //         foreignField: '_id',
        //         as:'users',
        //     }},
        //     {$match:{sendId:mongoose.Types.ObjectId(userId)}}
        // ])
        // .then((response)=>{
        //     console.log(response)
        // })
        // message:{ $regex: '.*' + key + '.*' }
        const chat=await Chat.find({sendId:userId})
        .populate({
            populate:'employeeprofile',
            model:'employee',
            match:{
                    companyName:{ $regex: '.*' + key + '.*' }
            }
        })
        // .distict('')
        .exec()
        // (chat)=>{
            //  }
                res.json(chat)
        // console.log(result)
    }
}


exports.sendmessage=(req,res,next)=>{
    const {userType}=req.body;
    if(userType==='freelancer' || userType==='company'){
        const {companyId}=req.body;
        User.findOne({companyId:companyId,userType:'company'})
        .then((user)=>{
            const {receiveId,message}=req.body;
            CompanyProfile.findOne({companyId:companyId})
            .then((profile)=>{
                Chat.create({
                    sendId:user._id,
                    receiveId:receiveId,
                    message:message,
                    companyprofile:profile._id
                })
            })
        })
    }else{
            const {sendId,receiveId,message}=req.body;
            Employee.findOne({userId:mongoose.Types.ObjectId(sendId)})
            .then((profile)=>{
                Chat.create({
                    sendId:sendId,
                    receiveId:receiveId,
                    message:message,
                    employeeprofile:profile._id,
                })
            })
    }

}


exports.setname=(req,res,next)=>{
    const {receiveId}=req.body;
    console.log(req.body)
    console.log('id',receiveId);
    User.findOne({_id:mongoose.Types.ObjectId(receiveId)})
    .populate('companyId')
    .then((user)=>{
        res.json(user);
    })
}