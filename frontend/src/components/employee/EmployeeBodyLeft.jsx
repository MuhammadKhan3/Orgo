import React, { useState } from "react";
import "../employee/employeeBody.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import VideoPopUp from "../popups/VideoPopUp.jsx";
import HoursPopUp from "../popups/HoursPopUp";
import LanguagePop from "../popups/LanguagePop";
import EditLanguagePop from "../popups/EditLanguagePop";
import EducationPop from "../popups/EducationPop";
import {useSelector} from 'react-redux' 
import SkillPop from "../popups/SkillPop";

function EmployeeBodyLeft() {
  const languages=useSelector(state=>state.companySlice.languages);
  const school=useSelector(state=>state.companySlice.school);
  const description=useSelector(state=>state.companySlice.sdescription);
  const degree=useSelector(state=>state.companySlice.degree);
  const degreelevel=useSelector(state=>state.companySlice.degreelevel);
  const hourworking=useSelector(state=>state.companySlice.hourworking);
  
  
  const [pop,setPop]=useState({
    video:false,
    hours:false,
    language:false,
    languageEdit:false,
    education:false,
    militaryVitiran:false
  })

function EmployeeBodyLeft() {
  const [pop, setPop] = useState({
    videoPop: false,
    hoursPop: false,
    languagePop: false,
    languageEditPop: false,
    educationPop: false,
    skillPop: false,
  });
}

  const handleClose = () => {
    setPop({
      videoPop: !pop.videoPop,
    });
  };

  const handleHourPop = () => {
    setPop({
      hoursPop: !pop.hoursPop,
    });
  };

  const handleLanguagePop = () => {
    setPop({
      languagePop: !pop.languagePop,
    });
  };

  const handleEditLanguagePop = () => {
    setPop({
      languageEditPop: !pop.languageEditPop,
    });
  };

  const handleEducationPop = () => {
    setPop({
      educationPop: !pop.educationPop,
    });
  };

  const handleSkillPop=()=>{
    setPop({
      skillPop:!pop.skillPop
    })
  }
  return (
    <div className="body-section-left">
      <ul>
        {/* <li>
          <h4>Video Introduction</h4>
          <AddCircleOutlineIcon onClick={handleClose} style={{cursor:"pointer"}} />
        </li> */}
        <li>
          <h4>Hours per week</h4>
          <CreateTwoToneIcon onClick={handleHourPop} style={{cursor:"pointer"}}/>
        </li>
        {hourworking &&
        <li>{hourworking}</li>}
        <li>
          <h4>Languages</h4>

          <AddCircleOutlineIcon onClick={handleLanguagePop} style={{cursor:"pointer"}} />
          <CreateTwoToneIcon onClick={handleEditLanguagePop}  style={{cursor:"pointer"}}/>

        </li>
        {languages.map((language)=>{
            return( 
            <>
              <li>{language.language} {language.level}</li>
            </>)

          })}

          <li>
            <h4>Education</h4>
            <AddCircleOutlineIcon onClick={handleEducationPop} style={{cursor:"pointer"}} />
          </li>
          <li>{degree}, {school}</li>
          <li>{degreelevel}</li>
        <li>
          Skills
          <AddCircleOutlineIcon onClick={handleSkillPop} style={{cursor:"pointer"}} />
        </li>
      </ul>

      {pop.videoPop ? <VideoPopUp handleClose={handleClose} /> : null}
      {pop.hoursPop ? <HoursPopUp handleClose={handleHourPop} /> : null}
      {pop.languagePop ? <LanguagePop handleClose={handleLanguagePop} /> : null}
      {pop.languageEditPop ? (
        <EditLanguagePop handleClose={handleEditLanguagePop} />
      ) : null}
      {pop.educationPop ? <EducationPop handleClose={handleEducationPop} /> : null}
      {pop.skillPop ? <SkillPop handleClose={handleSkillPop} /> : null}

    </div>
  );
}

export default EmployeeBodyLeft
