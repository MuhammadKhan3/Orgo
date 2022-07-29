const mongoose=require('mongoose');
const Chat = require('../model/chat');
const CompanyProfile = require('../model/companyProfile');
const User = require('../model/users');
const Employee=require('../model/employee')
const users=[];
exports=module.exports=function(io){
// socket.........
io.on("connection", (socket) => {
    // Users.updateOne({companyId:companyId})
    socket.on("click",({sendId,userType,companyId})=>{
        function upsert(array, element) { // (1)
            const i = array.findIndex(_element => _element._id === element._id);
            if (i > -1) array[i] = element; // (2)
            else array.push(element);
        }
        
        users[socket.id]=socket.id;
        // users[]=socket.id;

      if(userType==='company' || userType==='freelancer'){
        User.findOne({companyId:mongoose.Types.ObjectId(companyId),userType:'company'})
        .then((user)=>{
            user.socketId=socket.id;
            user.save();
            upsert(users,user)
        })
      }else if(userType==='employee'){
        User.findOne({userId:mongoose.Types.ObjectId(sendId),userType:'employee'})
        .then((user)=>{
            user.socketId=socket.id;
            user.save();
          console.log('in',socket.id)
        })
      }
    });
    
    socket.on("send-message",({companyId,sendId,receiveId,message,userType})=>{
      User.findOne({_id:receiveId})
      .then((users)=>{
      console.log(companyId,sendId,receiveId,message,userType)
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
        console.log('users',users);
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
                      // io.to(users.socketId).emit('receive',{chat:result})
                      // io.sockets.socket(users.socketId).emit('receive',{chat:result})
                    })
                  })
  
               })
             }
            })
          })
            socket.on("disconnect", ({userId,userType,companyId}) => {
              User.updateOne({socketId:socket.id},{$set:{socketId:''}})
              .then(()=>{
                console.log('in',socket.id)
              })
            });
            
          });
  // close socket....          
}
