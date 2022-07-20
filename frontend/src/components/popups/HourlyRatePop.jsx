import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";

function HourlyRatePop({ handleClose }) {
  return (
    <div className="main-box">
      <div className="popup-box">
        <div>
          <h3 className="pop-video-heading">Change hourly rate</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label" style={{ margin: "10px 0 10px 0" }}>
            Please note that your new hourly rate will only apply to new
            contracts.
          </p>
          <p style={{ margin: "10px 0 10px 0" }}>
            The Upwork Service Fee is 20% when you begin a contract with a new
            client. Once you bill over $500.00 with your client, the fee will be
            10%.
          </p>
          <input
            style={{ margin: "10px 0 10px 0" }}
            className="pop-video-input"
            type="text"
            placeholder="Ex: 10.00 $/hr"
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

export default HourlyRatePop;
