import React, { useRef } from "react";
import Button from "../button/Button";
import "../popups/popup.css";

function CompContactPop({handleClose}) {
  return (
    <div className="main-box">
      <div className="popup-box">
        <div>
          <h3 className="pop-video-heading">Company Contact</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label">Owner</p>
          <input
            className="pop-video-input"
            type="email"
            placeholder="abc123"
          />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label">Phone</p>
          <input
            className="pop-video-input"
            type="text"
            value="0304xxxxxxx"
          />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label">Address</p>
          <input
            className="pop-video-input"
            type="address"
            placeholder="House, Street, Area, City"
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

export default CompContactPop;
