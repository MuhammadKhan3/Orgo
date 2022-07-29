import React from "react";
import format from 'date-fns/format'
import avatar from "../chat/avatar.png";
import "../chat/chat.css";

function Messages({message,companyName,picture,index,createdAt}) {
  return (
    <>
      <div className="main-message" key={index}>
        <img className="chat-avatar" src={ picture ? `http://localhost:8000/${picture}` : avatar} alt="" />
        <div>
          <div style={{ display: "flex", marginLeft: "5px" }}>
            <h3 style={{ fontWeight: "500" }}>{companyName}</h3>
            <p
              style={{
                fontSize: "0.8em",
                marginLeft: "40px",
                marginTop: "3px",
              }}
            >
              {" "}
              {format(new Date(createdAt), 'dd/MM/h:m aaa')}
            </p>
          </div>
          <div style={{ marginLeft: "5px" }}>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;
