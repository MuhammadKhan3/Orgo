import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";

function HoursPopUp({ handleClose }) {
  return (
    <div>
      <div className="main-box">
        <div className="popup-box">
          <div>
            <h3 className="pop-video-heading">Hours per week</h3>
            <hr />
          </div>
          <div className="pop-video-content">
            <p className="pop-input-label">
              Knowing how much you can work helps Upwork find the right jobs for
              you{" "}
            </p>
            <p style={{ marginTop: "20px" }}>I can currently work</p>
            <div style={{ marginTop: "-10px" }}>
              <input
                type="radio"
                id="more_30"
                name="work_hours"
                value="more than 30 hrs/week"
              />
              <label className="radio-lable" for="more_30">
                more than 30 hrs/week
              </label>
              <br />
              <input
                type="radio"
                id="less_30"
                name="work_hours"
                value="less than 30 hrs/week"
              />
              <label className="radio-lable" for="less_30">
                less than 30 hrs/week
              </label>
              <br />
              <input
                type="radio"
                id="as_need"
                name="work_hours"
                value="As needed - open to offers"
              />
              <label className="radio-lable" for="as_need">
                As needed - open to offer
              </label>
              <br />
              <input type="radio" id="none" va name="work_hours" lue="None" />
              <label className="radio-lable" for="none">
                none
              </label>
            </div>
          </div>
          <br />
          <hr />

          <div className="button-container">
            <Button className="cancel" content="Cancel" handle={handleClose} />
            <Button className="save" content="Save" />
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default HoursPopUp;
