import React from "react";
import '../chat/chat.css'
import ChatRightSection from "./ChatRightSection";
import ChatSideBar from "./ChatSideBar";
import {useSearchParams} from 'react-router-dom'
function Chat() {
  const [searchParams]=useSearchParams();
  return (
    <div className="main-chat">
      <ChatSideBar/>
      {/* {searchParams.get('receiveId') && */}
      <ChatRightSection/>
      {/* }  */}
    </div>
  );
}

export default Chat;
