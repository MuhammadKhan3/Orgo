import React from "react";
import CallIcon from "@mui/icons-material/Call";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Messages from "./Messages";
import { TextareaAutosize } from "@mui/material";
import "../chat/chat.css";
const { io } = require("socket.io-client");
const socket = io('http://localhost:8000');

function ChatRightSection() {
  const sendhandler=()=>{

  }
  return (
    <div className="right-section">
      <div className="chat-body-nav">
        <h1 style={{ fontSize: "1.1em", fontWeight: "500" }}>Hamza</h1>
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
          height: "350px",
        }}
      >
        <Messages />
        <Messages />
      </div>
      <TextareaAutosize
          aria-label="Enter Description"
          placeholder="Write your message here!"
          style={{
            width: "1015px",
            borderTop:"1px solid lightgrey",
            padding: "10px",
            fontSize: "0.9em",
            marginTop: "5px",
          }}
          minRows={3}
        />
    </div>
  );
}

export default ChatRightSection;
