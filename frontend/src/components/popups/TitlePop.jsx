import React from "react";
import Button from "../button/Button";
import { TextareaAutosize } from "@mui/material";
import "../popups/popup.css";

function TitlePop({ handleClose }) {
  return (
    <div className="main-box">
      <div className="popup-box">
        <div>
          <h3 className="pop-video-heading">Edit your title</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label" style={{ margin: "10px 0 10px 0" }}>
            Your title{" "}
          </p>
          <p style={{ margin: "10px 0 10px 0" }}>
            Enter a single sentence description of your professional
            skills/experience (e.g. Expert Web Designer with Ajax experience)
          </p>
          <input
            style={{ margin: "10px 0 10px 0" }}
            className="pop-video-input"
            type="text"
            placeholder="Ex: Senior Mobile App developer"
          />
          <TextareaAutosize
            aria-label="Enter Description"
            placeholder="Enter Description"
            style={{
              width: 530,
              border: "1px solid #999",
              borderRadius: "3px",
              padding: "10px",
              fontSize:"0.9em",
            }}
            minRows={4}
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

export default TitlePop;
