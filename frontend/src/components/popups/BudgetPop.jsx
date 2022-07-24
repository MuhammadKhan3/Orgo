import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";
import MuiDropDown from "../muiComponents/MuiDropDown";

function BudgetPop({ handleClose }) {
  return (
    <div className="main-box">
      <div style={{ width: "750px" }} className="popup-box">
        <div>
          <h3 className="pop-video-heading">Your Budget</h3>
          <hr />
        </div>
        <div
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "150px",
          }}
        >
          <input
            style={{ margin: "10px 0 10px 0" }}
            className="pop-video-input"
            type="text"
            placeholder="Ex: 10.00 $/hr"
          />
        </div>
        <div className="button-container">
          <Button className="cancel" content="Cancel" handle={handleClose} />
          <Button className="save" content="Save" />
        </div>
      </div>
    </div>
  );
}

export default BudgetPop;
