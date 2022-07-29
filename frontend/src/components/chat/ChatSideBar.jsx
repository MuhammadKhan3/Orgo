import React,{useEffect} from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import avatar from "../chat/avatar.png";
import {useSelector,useDispatch} from 'react-redux';
import "../chat/chat.css";
import {Cookies} from 'react-cookie'
import axios from 'axios'
import {useSearchParams} from 'react-router-dom';
import {chat_action} from '../redux/slice/chatSlice'
import { Link } from "react-router-dom";
const cookies=new Cookies();

function ChatSideBar() {
  const [searchParams]=useSearchParams();
  const dispatch=useDispatch();
  const userlist=useSelector(state=>state.chatSlice.userlist)
  const flag=useSelector(state=>state.chatSlice.flag)
  const users=useSelector(state=>state.chatSlice.user)
  const userType=cookies.get('userType')
  const { io } = require("socket.io-client");
  const socket = io("http://localhost:8000");


  const containhandler=(receiveId,name)=>{
    cookies.set('chatname',name);
    const userType=cookies.get('userType');
    const user=cookies.get('userId');
    const company=cookies.get('companyId');
    const token=cookies.get('token');
    let sendId,companyId;
    
    if(userType==='freelancer' || userType==='company'){
      companyId=company;
    }else{
      sendId=user;
    }

    axios.post('http://localhost:8000/messagelist',{
      sendId,
      companyId,
      userType,
      receiveId,
    })
    .then((response)=>{
      console.log(response)
      dispatch(chat_action.setchats(response.data))
    })
}

useEffect(()=>{
  const fetchmessage=()=>{
    const receiveId=searchParams.get('receiveId');
    const userType=cookies.get('userType');
    const user=cookies.get('userId');
    const company=cookies.get('companyId');
    const token=cookies.get('token');

    let sendId,companyId;
    if(userType==='freelancer' || userType==='company'){
      companyId=company;
    }else{
      sendId=user;
    }

    axios.post('http://localhost:8000/messagelist',{
      sendId,
      companyId,
      userType,
      receiveId,
    })
    .then((response)=>{
      console.log(response)
      dispatch(chat_action.setchats(response.data))
    })
  }
  fetchmessage();
},[flag])


  const searchhandler=(e)=>{
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
    const key=e.target.value;
    axios.post('http://localhost:8000/search-list',{
      userId,
      companyId,
      userType,
      key,
      headers:{authorization:'Bearer'+ token}
    }).then((response)=>{
      console.log(response.data)
      dispatch(chat_action.setuserlist(response.data.userlist))
      dispatch(chat_action.setuser(response.data.user))

    })

  }


  return (
    <div className="sidebar">
      <div className="side-bar-header">
        <div className="side-search-container">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            className="side-search-input"
            placeholder="Search"
            onChange={searchhandler}
          />
        </div>
        <MoreHorizIcon style={{ cursor: "pointer" }} />
      </div>
      {/* <hr /> */}
      {userlist &&
       userlist.map((user,i)=>{
        return (<Link to={`/message?receiveId=${users[i]._id}`}>
                  <div className="side-bar-body" key={i} onClick={()=>containhandler(users[i]._id,userType==='employee' ? user.companyId.companyName :user.companyName)} >
                  <div className="single-user">
                    <img className="chat-avatar" src={user.picture.length>0 ? `http://localhost:8000/${user.picture}` :avatar} alt="" />
                    <div style={{marginLeft:"15px"}}>
                      {console.log()}
                      <h3 style={{fontWeight:"700"}}>{userType==='employee' ? user.companyId.companyName :user.companyName}</h3>
                      <p>{userType==='employee' ? user.description.split(" ").splice(0, 5).join(" "): ''}</p>
                    </div>
                  </div>
                </div>
                </Link>)})}
    </div>
  );
}

export default ChatSideBar;
