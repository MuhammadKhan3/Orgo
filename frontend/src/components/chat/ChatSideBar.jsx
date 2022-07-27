import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import avatar from "../chat/avatar.png";
import "../chat/chat.css";

function ChatSideBar() {
  return (
    <div className="sidebar">
      <div className="side-bar-header">
        <div className="side-search-container">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            className="side-search-input"
            placeholder="Search"
          />
        </div>
        <MoreHorizIcon style={{ cursor: "pointer" }} />
      </div>
      {/* <hr /> */}
      <div className="side-bar-body">
        <div className="single-user">
          <img className="chat-avatar" src={avatar} alt="" />
          <div style={{marginLeft:"15px"}}>
            <h3 style={{fontWeight:"700"}}>Osama</h3>
            <p>I need cash back</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSideBar;
