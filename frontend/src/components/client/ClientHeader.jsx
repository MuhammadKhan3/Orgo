import React from "react";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import avatar from '../client/avatar.png'
import "../client/clientHeader.css";

function ClientHeader() {
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

  return (
    <div className="sub-client-head">
      <div className="client-top-header">
        <h3 style={{ fontWeight: "bold", fontSize: "1.2em" }}>Account</h3>
        <CreateTwoToneIcon />
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
              src={avatar}
              ref={uploadedImage}
            />
          </div>
        </div>
        <div className="client-data">
            <p style={{fontWeight:"bold"}}>mosamanadeem</p>
            <p>Muhammad Osama</p>
            <p style={{fontWeight:"bold"}}>Email</p>
            <p>muhammadosama3556@gmail.com</p>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default ClientHeader;
