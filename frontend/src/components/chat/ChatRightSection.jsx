import React,{useEffect} from "react";
import CallIcon from "@mui/icons-material/Call";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Messages from "./Messages";
import { TextareaAutosize, TextField } from "@mui/material";
import "../chat/chat.css";
import {Cookies} from 'react-cookie'
import {useSelector,useDispatch} from 'react-redux'
import { chat_action } from "../redux/slice/chatSlice";
import {useSearchParams} from 'react-router-dom';
const { io } = require("socket.io-client");
const socket = io("http://localhost:8000");

const cookies=new Cookies();




function ChatRightSection() {
  const [searchParams]=useSearchParams();
  const chats=useSelector(state=>state.chatSlice.chats);
  const flag=useSelector(state=>state.chatSlice.flag);

  const name=useSelector(state=>state.chatSlice.name);
  const message=useSelector(state=>state.chatSlice.message);
  const dispatch=useDispatch();

  const sendhandler=()=>{
    const userType=cookies.get('userType');
    const userId=cookies.get('userId');
    const companyId=cookies.get('companyId');
    const receiveId=searchParams.get('receiveId');
    
    const data={
      companyId:companyId,
      sendId:userId,
      userType:userType,
      receiveId:receiveId,
      message:message,
    }
    
    socket.emit('send-message',data); 
    dispatch(chat_action.setflag(!flag));
    dispatch(chat_action.setmessage(''))
  }




  useEffect(()=>{
    socket.once('receive',({chat})=>{
      dispatch(chat_action.setchat(chat))
    })
    return () => {
      socket.off("receive");
    };
  },[])

  const messagehandler=(e)=>{
    dispatch(chat_action.setmessage(e.target.value))
  }



  return (
    <div className="right-section">
      <div className="chat-body-nav">
        <h1 style={{ fontSize: "1.1em", fontWeight: "500" }}>{cookies.get('chatname')}</h1>
        <div
          style={{
            width: "100px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <CallIcon className="icon" />
          <ErrorOutlineIcon className="icon" />
        </div>
      </div>
      <br />
      <br />
      <div
        className="message-box"
        style={{
          borderTop: "1px solid lightgrey",
          height: "440px",
          overflowY:"scroll",
        }}
      >
        {searchParams.get('receiveId') && chats.map((chat,i)=>{
            return (<Messages index={i} key={i} message={chat.message} companyName={chat.employeeprofile ? chat.employeeprofile.companyName  : chat.companyprofile.companyId.companyName } picture={chat.employeeprofile ? chat.employeeprofile.picture  : chat.companyprofile.picture } createdAt={chat.createdAt}/>)
        })}
      </div>
      <TextField
        placeholder="Write your message here !"
        multiline
        onChange={messagehandler}
        value={message}
        rowsMax="3"
        // <AttachFileIcon style={{marginRight:"10px"}}/>
        InputProps={{ endAdornment: <><SendIcon style={{color:"green", cursor:"pointer"}} onClick={sendhandler} /></>}}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "0.9em",
          marginTop:"5px",
          padding:"5px",
          outline: "none"
        }}
      />
    </div>
  );
}
export default ChatRightSection;
