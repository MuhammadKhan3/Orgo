import React, { useEffect, useState } from "react";
import avatar from "../employee/avatar.png";
import "../employee/employeeHeader.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {Cookies} from 'react-cookie'
import {useSelector} from 'react-redux'
import axios from 'axios'
import { Link } from "react-router-dom";
const cookies=new Cookies();

function EmployeeHeader() {
  const [time, setTime] = useState();
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const companyName=useSelector(state=>state.companySlice.companyname);
  const timezone=useSelector(state=>state.companySlice.timezone);
  const country=useSelector(state=>state.companySlice.country);
  const picture=useSelector(state=>state.companySlice.picture);
  
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
    const formdata=new FormData();
    formdata.append('file',file);
    const companyId=cookies.get('companyId');
    const token=cookies.get('token');
    axios.post(`http://localhost:8000/company-picture/${companyId}`,formdata)
    .then((response)=>{
      console.log(response)
    })
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
              src={picture.length>0 ? `http://localhost:8000/${picture}` :avatar}
              ref={uploadedImage}
            />
          </div>
        </div>
        <div className="head-text1">
          <h2 className="user-name">{companyName.toUpperCase() }</h2>
          <LocationOnIcon className="location-icon" />
          <p className="location-time">{timezone } {country} - {time} </p>
        </div>
      </div>
      <div className="head-container2">
        <Link to='/company/profile'>
         <button className="view">See Public View</button>
        </Link>
      </div>
    </div>
  );
}

export default EmployeeHeader;
