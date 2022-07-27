import React from "react";
import CallIcon from "@mui/icons-material/Call";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Messages from "./Messages";
import { TextareaAutosize, TextField } from "@mui/material";
import "../chat/chat.css";
const { io } = require("socket.io-client");
const socket = io("http://localhost:8000");

function ChatRightSection() {
  const sendhandler = () => {};
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
      <TextField
        // label="Write your message here !"
        placeholder="Write your message here !"
        multiline
        rowsMax="3"
        InputProps={{ endAdornment: <><AttachFileIcon style={{marginRight:"10px"}}/><SendIcon style={{color:"green"}} /></>}}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "0.9em",
          padding:"5px",
          marginTop: "100px",
          outline: "none"
        }}
      />
    </div>
  );
}

export default ChatRightSection;
