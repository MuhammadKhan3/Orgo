import React from "react";
import avatar from "../chat/avatar.png";
import "../chat/chat.css";

function Messages() {
  return (
    <>
      <div className="main-message">
        <img className="chat-avatar" src={avatar} alt="" />
        <div>
          <div style={{ display: "flex", marginLeft: "5px" }}>
            <h3 style={{ fontWeight: "500" }}>Muhammad Osama</h3>
            <p
              style={{
                fontSize: "0.8em",
                marginLeft: "40px",
                marginTop: "3px",
              }}
            >
              {" "}
              7:30 pm
            </p>
          </div>
          <div style={{ marginLeft: "5px" }}>
            <p>Avaiable ?</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;
