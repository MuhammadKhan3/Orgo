import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";

function VideoPopUp({ handleClose }) {
  return (
    <div className="main-box">
      <div className="popup-box">
        <div>
          <h3 className="pop-video-heading">Add Video Introduction</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label">Link to your YouTube video </p>
          <input
            className="pop-video-input"
            type="text"
            placeholder="Ex: https://www.youtube.com/watch?v=CCF-xV3RSSs"
          />
          <a className="guideLine-link" href="">
            <p style={{ marginTop: "3px" }}>
              Does your video meet Upwork's guidelines?
            </p>
          </a>
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label">What type of video is this ? </p>
          <select className="pop-video-input">
            <option>Me talking about my skills and experience</option>
            <option value="mercedes">Visual samples of my work</option>
            <option value="audi">Something else</option>
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

export default VideoPopUp;

