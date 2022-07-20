import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";


function PortfolioPop({ handleClose }) {
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
    <div className="main-box">
      <div className="popup-box">
        <div>
          <h3 className="pop-video-heading">Add yout portfolio</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p style={{ margin: "10px 0 10px 0" }}>Link of your portfolio</p>
          <input
            style={{ margin: "10px 0 10px 0" }}
            className="pop-video-input"
            type="text"
            placeholder="Ex : https://www.abcportfolio.com"
          />
        </div>
        <div className="profile-image" style={{width:"100%", display:"flex", justifyContent:"center", marginBottom:"20px" }}>
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
            <AddBoxIcon className="portfolioIcon" />
          </div>
        </div>
        <hr />

        <div className="button-container">
          <Button className="cancel" content="Cancel" handle={handleClose} />
          <Button className="save" content="Save" />
        </div>
      </div>
    </div>
  );
}

export default PortfolioPop;
