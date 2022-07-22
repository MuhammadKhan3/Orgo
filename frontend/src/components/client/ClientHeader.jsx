import React, { useState } from "react";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import avatar from '../client/avatar.png'
import "../client/clientHeader.css";
import ClientAccountPop from "../popups/ClientAccountPop";
import {useDispatch,useSelector} from 'react-redux'
import {Cookies} from 'react-cookie'
import axios from 'axios'
const cookies=new Cookies();

function ClientHeader() {

  const name=useSelector(state=>state.companySlice.name);
  const picture=useSelector(state=>state.companySlice.picture);
  const email=useSelector(state=>state.companySlice.email);
  
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [accountPopUp,setAccountPopUp]=useState(false);




  const handleAccountPop=()=>{
    setAccountPopUp(!accountPopUp);
  }
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
      const employeeId=cookies.get('employeeId');
      const formdata=new FormData();
      formdata.append('file',uploadedImage.current.file);
      axios.post(`http://localhost:8000/employee-picture/${employeeId}`,formdata)
      .then((response)=>{
        console.log(response)
      })
    }
  };

  return (
    <div className="sub-client-head">
      <div className="client-top-header">
        <h3 style={{ fontWeight: "bold", fontSize: "1.2em" }}>Account</h3>
        <CreateTwoToneIcon onClick={handleAccountPop} style={{cursor:"pointer"}} />
      </div>
      <hr />
      <div className="client-personal-info">
        <div className="client-profile-image">
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
              src={picture.length>0 ? `http://localhost:8000/${picture}` : avatar}
              ref={uploadedImage}
            />
          </div>
        </div>
        <div className="client-data">
            {/* <p style={{fontWeight:"bold"}}>mosamanadeem</p> */}
            <p style={{fontWeight:"bold"}}>{name}</p>
            <p style={{fontWeight:"bold"}}>Email</p>
            <p>{email}</p>
        </div>
      </div>
      <hr />
      {accountPopUp ? <ClientAccountPop clientName setClientName handleClose={handleAccountPop}/> : null}
    </div>
  );
}

export default ClientHeader;
