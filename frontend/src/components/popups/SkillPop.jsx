import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";
import { useState } from "react";

function SkillPop({ handleClose }) {
  const [skills,setSkills]=useState([])
  return (
    <div className="main-box">
      <div className="popup-box">
        <div>
          <h3 className="pop-video-heading">Add your Skills</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label">Add your skills</p>
          <select className="pop-video-input">
            <option>Node Js</option>
            <option value="mercedes">React</option>
            <option value="audi">Mongo DB</option>
          </select>
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
