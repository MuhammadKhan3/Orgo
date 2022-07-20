import React, { useState } from "react";
import "../employee/employeeBody.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import VideoPopUp from "../popups/VideoPopUp.jsx";
import HoursPopUp from "../popups/HoursPopUp";
import LanguagePop from "../popups/LanguagePop";
import EditLanguagePop from "../popups/EditLanguagePop";
import EducationPop from "../popups/EducationPop";


function EmployeeBodyLeft() {
  const [pop,setPop]=useState({
    video:false,
    hours:false,
    language:false,
    languageEdit:false,
    education:false,
    militaryVitiran:false
  })

  const handleClose = () => {
    setPop({
      video:!pop.video,
    });
  };

  const handleHourPop=()=>{
    setPop({
      hours:!pop.hours
    })
  }

  const handleLanguagePop=()=>{
    setPop({
      language:!pop.language
    })
  }

  const handleEditLanguagePop=()=>{
    setPop({
      languageEdit:!pop.languageEdit
    })
  }

  const handleEducationPop=()=>{
    setPop({
      education:!pop.education
    })
  }

  
  return (
    <div className="body-section-left">
      <ul>
        <li>
          <h4>Video Introduction</h4>
          <AddCircleOutlineIcon onClick={handleClose} />
        </li>
        <li>
          <h4>Hours per week</h4>
          <CreateTwoToneIcon onClick={handleHourPop}/>
        </li>
        <li>
          <h4>Languages</h4>
          <AddCircleOutlineIcon onClick={handleLanguagePop} />
          <CreateTwoToneIcon onClick={handleEditLanguagePop} />
        </li>
        <li>
          <h4>Education</h4>
          <AddCircleOutlineIcon onClick={handleEducationPop} />
        </li>
        <li id="verification">
          <h4>Verification</h4>
          <li className="mli">
            Military Vitiran
            <AddCircleOutlineIcon />
          </li>
        </li>
      </ul>

      {pop.video ? <VideoPopUp handleClose={handleClose} /> : null}
      {pop.hours ? <HoursPopUp handleClose={handleHourPop} /> : null}
      {pop.language? <LanguagePop handleClose={handleLanguagePop}/> : null}
      {pop.languageEdit ? <EditLanguagePop handleClose={handleEditLanguagePop} /> : null}
      {pop.education? <EducationPop handleClose={handleEducationPop} /> : null }


    </div>
  );
}

export default EmployeeBodyLeft;
