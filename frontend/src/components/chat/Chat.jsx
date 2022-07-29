import React from "react";
import '../chat/chat.css'
import ChatRightSection from "./ChatRightSection";
import ChatSideBar from "./ChatSideBar";
const { io } = require("socket.io-client");
const socket = io("http://localhost:8000");
function Chat() {

  return (
    <div className="main-chat">
      <ChatSideBar/>
      <ChatRightSection/>
    </div>
  );
}

export default Chat;
