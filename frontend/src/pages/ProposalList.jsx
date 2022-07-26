import React from "react";
import "../pages/proposalList.css";
import avatar from "../pages/avatar.png";
import Button from "../components/button/Button";

const skills = [
  "MySQL",
  "MongoDb",
  "Firebase",
  "Express",
  "JavaScript",
  "React",
];
function ProposalList() {
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
    const formdata = new FormData();
    formdata.append("file", file);
  };
  return (
    <div className="main-proposal-list-container">
      <div className="proposal-list-sub-container">
        <div className="proposal-list-header">
          <h1
            style={{ fontSize: "1.2em", fontWeight: "500", color: "#656565" }}
          >
            Proposal
          </h1>
        </div>
        <ul style={{ marginLeft: "30px" }}>
          <li
            style={{
              color: "#656565",
              fontWeight: "400",
              borderBottom: "2px solid green",
              width: "80px",
            }}
          >
            Recent Job
          </li>
        </ul>
        <hr />
        <div className="proposal-list-user-info">
          <div className="user-info-container-1">
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
            <div className="user-name-rates">
              <h2 style={{color:"green", fontSize:"1.2em", fontWeight:"500"}}>Muhammad Osama</h2>
              <p style={{color:"#656565"}}>Web Developer</p>
              <p>Pakistan</p>
              <div className="rates">
                <p>$19.00/hr</p>
                <p>$0 earned</p>
              </div>
              <p style={{ marginTop: "10px" }}>
                Cover letter - I have provided the best best solution in project
              </p>
            </div>
            <div style={{ marginLeft: "50px"}}>
              <Button content="Messages" />
              <Button content="Hire" />
            </div>
          </div>
          <ul className="skill-list">
            {skills
              ? skills.map((list, key) => {
                  console.log(list.length);
                  return (
                    <li
                      style={{
                        width: `${list.length + 1}0px`,
                        padding: "6px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "20px",
                        fontSize: "0.8em",
                        fontWeight: "lighter",
                        backgroundColor: "#396179",
                        color: "white",
                      }}
                    >
                      {list}
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProposalList;
