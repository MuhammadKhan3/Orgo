import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";
import MuiDropDown from "../muiComponents/MuiDropDown";


const languages = [
    "Arabic",
    "American",
    "Africi",
    "English",
    "Bengali",
    "Bulgarian",
    "Chinese",
    "French",
    "German",
    "Irish",
    "Japanese",
    "Spanish",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
    "Urdu",
  ];

const languageType=["Basic","Conversational","Fluent","Native or Bilingual"]

function EditLanguagePop({ handleClose }) {
  
  return (
    <div className="main-box">
      <div style={{ width: "750px" }} className="popup-box">
        <div>
          <h3 className="pop-video-heading">Edit Languages</h3>
          <hr />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom:"150px"}}>
          <MuiDropDown text="Language" languages={languages} ability={true}/>
          <MuiDropDown text="Proficiency Level" languages={languageType} ability={false}/>
        </div>
        <div className="button-container">
          <Button className="cancel" content="Cancel" handle={handleClose} />
          <Button className="save" content="Save" />
        </div>
      </div>
    </div>
  );
}

export default EditLanguagePop;