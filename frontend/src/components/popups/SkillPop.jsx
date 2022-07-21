import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";

function SkillPop({ handleClose }) {
  return (
    <div className="main-box">
      <div className="popup-box">
        <div>
          <h3 className="pop-video-heading">Add your Skills</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p
            className="pop-input-label"
            style={{ margin: "10px 0 10px 0", fontWeight: "bold" }}
          >
            Skills
          </p>
          <p style={{ margin: "10px 0 10px 0" }}>
            Keeping your skills up to date helps you get the jobs you want.
          </p>
          <input
            style={{ margin: "10px 0 10px 0" }}
            className="pop-video-input"
            type="text"
            placeholder="Search skills"
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

export default SkillPop;
