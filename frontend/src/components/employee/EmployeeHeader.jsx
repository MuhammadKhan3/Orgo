import React, { useEffect, useState } from "react";
import avatar from "../employee/avatar.png";
import "../employee/employeeHeader.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function EmployeeHeader() {
  const [time, setTime] = useState();
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      let hours = new Date().getHours().toLocaleString(); //Current Hours
      let min = new Date().getMinutes().toLocaleString(); //Current Minutes
      let ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      min = min.toString().padStart(2, "0");
      setTime(hours + ":" + min + " " + ampm + " local time");
    }, 1000);

    return () => {
      clearInterval(timer);
    };
    
  }, []);

  return (
    <div className="emp-head-main">
      <div className="head-container1">
        <div className="profile-image">
          <input
            className="profile-change-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={imageUploader}
          />
          <div
            className="image-avatar"
            onClick={() => imageUploader.current.click()}
          >
            <img
              className="user-avatar-image"
              src={avatar}
              ref={uploadedImage}
            />
          </div>
        </div>
        <div className="head-text1">
          <h2 className="user-name">Muhammad Osama Nadeem</h2>
          <LocationOnIcon className="location-icon" />
          <p className="location-time">Karachi, Pakistan - {time} </p>
        </div>
      </div>
      <div className="head-container2">
        <button className="view">See Public View</button>
        <button className="profile-setting">Profile setting</button>
      </div>
    </div>
  );
}

export default EmployeeHeader;
