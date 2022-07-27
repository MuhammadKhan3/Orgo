import React from "react";
import '../chat/chat.css'
import ChatRightSection from "./ChatRightSection";
import ChatSideBar from "./ChatSideBar";

function Chat() {
  return (
    <div className="main-chat">
      <ChatSideBar/>
      <ChatRightSection/>
    </div>
  );
}

export default Chat;
