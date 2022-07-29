import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux';
import axios from 'axios';
import Chat from '../components/chat/Chat';
import {Cookies} from 'react-cookie';
import {chat_action } from '../components/redux/slice/chatSlice'
import {useSearchParams} from 'react-router-dom';
const cookies=new Cookies();
const { io } = require("socket.io-client");
const socket = io("http://localhost:8000");


function ChatPage() {
  const [searchParams]=useSearchParams();
  const userType=cookies.get('userType');
  const dispatch=useDispatch();
  
  useEffect(()=>{
    const FetchUserlist=()=>{
      const userType=cookies.get('userType');
      const user=cookies.get('userId');
      const company=cookies.get('companyId');
      const token=cookies.get('token');

      let userId,companyId;
      if(userType==='freelancer' || userType==='company'){
        userId=user;
        companyId=company;
      }else{
        userId=user;
      }

      axios.post('http://localhost:8000/userlist',{
        userId,
        companyId,
        userType,
        headers:{authorization:'Bearer'+ token}
      }).then((response)=>{
        console.log(response.data)
        dispatch(chat_action.setuserlist(response.data.userlist))
        dispatch(chat_action.setuser(response.data.user))
      })
    }
    FetchUserlist();
    const registersocket=()=>{
      const userId=cookies.get('userId');
      const userType=cookies.get('userType');
      let companyId;
      if(userType==='company' || userType==='company'){
        companyId=cookies.get('companyId')
      }
      const data={
        socketId:socket.id,
        userId:userId,
        userType:userType,
        companyId:companyId,
      }
      socket.emit("click",data);
    }
    registersocket();
    const receiveId=searchParams.get('receiveId');
    console.log(receiveId)
    axios.post('http://localhost:8000/set-name',{
      receiveId,
      headers:{
        authorization:'Bearer '
      }
    })
    .then((response)=>{
      console.log(response)
      if(response.data && response.data.userType==='company'){
        console.log(response.data)
        cookies.set('chatname',response.data.companyId.companyName)
      }
    })
  },[])
  // /set-name
  
  
  return (
    <div>
        <Chat/>
    </div>
  )
}

export default ChatPage