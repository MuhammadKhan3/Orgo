const mongoose=require('mongoose');
const Chat = require('../model/chat');
const CompanyProfile = require('../model/companyProfile');
const User = require('../model/users');
const Employee=require('../model/employee')
const users=[];
exports=module.exports=function(io){
// socket.........
io.on("connection", (socket) => {
    socket.on("click",({userId,userType,companyId})=>{
      console.log(userType)
      console.log(userId)
      console.log(socket.id)



      if(userType==='company' || userType==='freelancer'){
        User.updateOne({companyId:mongoose.Types.ObjectId(companyId),userType:'company'},{$set:{socketId:socket.id}})
        .then((user)=>{
          console.log('null..',user)
            // user.socketId=socket.id;
            // user.save();
        })
      }else if(userType==='employee'){
        User.updateOne({_id:mongoose.Types.ObjectId(userId),userType:'employee'},{$set:{socketId:socket.id}})
        .then((user)=>{
          console.log('null..',user)
        })
      }
    });
    
    socket.on("send-message",({companyId,sendId,receiveId,message,userType})=>{
    if(receiveId && sendId && message && userType){

      if(userType==='freelancer' || userType==='company'){
          //Create 
          User.findOne({companyId:companyId,userType:'company'})
          .then((user)=>{
              CompanyProfile.findOne({companyId:companyId})
              .then((profile)=>{
                  Chat.create({
                      sendId:user._id,
                      receiveId:receiveId,
                      message:message,
                      companyprofile:profile._id
                  })
                  .then((chat)=>{
                    Chat.findById(chat._id)
                    .populate({
                      path:'companyprofile',
                      populate:{
                          path:'companyId',
                          model: 'company'
                      }
                     })
                    .populate({
                      path:'companyprofile',
                      populate:{
                          path:'companyId',
                          model: 'company'
                      }
                     })
                    .then((result)=>{
                      socket.broadcast.emit('receive',{chat:result})
                    })
                  })
              })
          })
      }else{
        console.log(receiveId);
        User.findOne({companyId:receiveId,userType:'company'})
        .then((users)=>{
          Employee.findOne({userId:mongoose.Types.ObjectId(sendId)})
          .then((profile)=>{
            Chat.create({
              sendId:sendId,
              receiveId:receiveId,
              message:message,
              employeeprofile:profile._id,
            })
            .then((chat)=>{
                    Chat.findById(chat._id)
                    .populate({
                      path:'employeeprofile',
                      // populate:{
                        //     path:'',
                        //     model: 'company'
                        // }
                      })
                    .then((result)=>{
                      socket.broadcast.emit('receive',{chat:result})

                    })
                  })
                  
                })
              })
             }
            }else{
              socket.emit('receive','receice id not exist')
            }
          
          
          })
            
            socket.on("disconnect", ({userId,userType,companyId}) => {
              User.updateOne({socketId:socket.id},{$set:{socketId:''}})
              .then(()=>{
              })
            });
            
          });
  // close socket....          
}
