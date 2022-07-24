import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";
import MuiDropDown from "../muiComponents/MuiDropDown";

const skills = [
    "React",
    "Node"
];
export default function SkillListPop({ handleClose }) {
  return (
    <div className="main-box">
      <div style={{ width: "750px" }} className="popup-box">
        <div>
          <h3 className="pop-video-heading">Add Skills</h3>
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
          <MuiDropDown
            text="Add Skills"
            languages={skills}
            ability={false}
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
