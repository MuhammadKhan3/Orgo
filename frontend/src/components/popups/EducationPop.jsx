import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";
import { fontSize, width } from "@mui/system";
import { Select, TextareaAutosize } from "@mui/material";

function EducationPop({ handleClose }) {
  return (
    <div className="main-box">
      <div className="popup-box-education">
        <div>
          <h3 className="pop-video-heading">Add Education</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label" style={{ fontWeight: "500" }}>
            School
          </p>
          <input
            className="pop-video-input"
            type="text"
            placeholder="Ex: Karachi University"
          />
        </div>
        <div className="pop-video-content">
          <p
            className="pop-input-label"
            style={{ fontWeight: "500", marginBottom: "10px" }}
          >
            Degree (Optional){" "}
          </p>
          <Select sx={{ width: 525 }} />
        </div>

        <div className="pop-video-content">
          <p
            className="pop-input-label"
            style={{ fontWeight: "500", marginBottom: "10px" }}
          >
            Area of Study (Optional){" "}
          </p>
          <input
            className="pop-video-input"
            type="text"
            placeholder="Ex: Computer Science"
          />
        </div>
        <div className="pop-video-content">
          <p
            className="pop-input-label"
            style={{ fontWeight: "500", marginBottom: "10px" }}
          >
            Description (Optional){" "}
          </p>
          <TextareaAutosize
            aria-label="Enter Description"
            placeholder="Empty"
            style={{ width: 525 , border:"1px solid #999", borderRadius:"3px" , padding:"10px"}}
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

export default EducationPop;
