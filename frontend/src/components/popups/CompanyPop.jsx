import React, { useRef } from "react";
import Button from "../button/Button";
import "../popups/popup.css";

function CompanyPop({ handleClose }) {
  const compNameRef = useRef(null);
  return (
    <div className="main-box">
      <div className="popup-box">
        <div>
          <h3 className="pop-video-heading">Company</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label">Company Name</p>
          <input
            className="pop-video-input"
            type="name"
            placeholder="Muhammad Osama"
            ref={compNameRef}
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

export default CompanyPop;
