import React, { useRef } from "react";
import Button from "../button/Button";
import "../popups/popup.css";

function ClientAccountPop({ clientName, setClientName, handleClose }) {
  const nameRef = useRef(null);

  // const handleSave = () => {
  //   let clientName=nameRef.current.value
  //   setClientName(clientName);
  // };
  return (
    <div className="main-box">
      <div className="popup-box">
        <div>
          <h3 className="pop-video-heading">Account</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label">Username</p>
          <input
            className="pop-video-input"
            type="text"
            value="mosamanadeem"
            readOnly
          />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label">Email</p>
          <input
            className="pop-video-input"
            type="text"
            value="muhammadosama3556@gmail.com"
            readOnly
          />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label">Name</p>
          <input
            className="pop-video-input"
            type="name"
            placeholder="Muhammad Osama"
            ref={nameRef}
          />
        </div>
        <br />
        <hr />

        <div className="button-container">
          <Button className="cancel" content="Cancel" handle={handleClose} />
          <Button className="save" content="Save" />
        </div>
      </div>
    </div>
  );
}

export default ClientAccountPop;
