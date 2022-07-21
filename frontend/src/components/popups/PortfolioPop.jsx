import React, { useRef, useState } from "react";
import "../popups/popup.css";
import Button from "../button/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import add_image2 from "../popups/add_image2.png";

function PortfolioPop({ portfolioData, setPortfolioData, handleClose }) {
  const [project, setProject] = useState({
    proname: null,
    proImage: null,
  });
  const titleRef = useRef(null);
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

  const handleSave = () => {
    setProject({
      proname: titleRef.current.value,
      proImage: imageUploader.current.value,
    });
    let list=portfolioData.concat({project})
    setPortfolioData(list)
    // setPortfolioData(portfolioData.add(project));
    console.log(titleRef.current.value);
    console.log(imageUploader);
  };
  return (
    <div className="main-box">
      <div className="popup-box">
        <div>
          <h3 className="pop-video-heading">Add yout portfolio</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p style={{ margin: "10px 0 10px 0" }}>Project title</p>
          <input
            name="name"
            id="name"
            style={{ margin: "10px 0 10px 0" }}
            className="pop-video-input"
            type="text"
            placeholder="Ex: Ecommerce store"
            ref={titleRef}
          />
        </div>
        <div
          className="profile-image"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <input
            className="profile-change-input"
            name="pimage"
            id="pimage"
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
              className="portfolioIcon"
              src={add_image2}
              ref={uploadedImage}
            />
          </div>
        </div>
        <hr />
        <p>{project.proname}</p>
        <img className="portfolioIcon" src={project.proImage} />

        <div className="button-container">
          <Button className="cancel" content="Cancel" handle={handleClose} />
          <Button handle={handleSave} className="save" content="Save" />
        </div>
      </div>
    </div>
  );
}

export default PortfolioPop;
