import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";
import MuiDropDown from "../muiComponents/MuiDropDown";
import {useSelector} from 'react-redux';
import { company_action } from "../redux/slice/companySlice";
import axios from 'axios'
import {Cookies} from 'react-cookie'
const cookies=new Cookies();


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

function LanguagePop({ handleClose }) {
  const language=useSelector(state=>state.companySlice.language);
  const level=useSelector(state=>state.companySlice.level);

  const savehandler=()=>{
    const token=cookies.get('token');
    const companyId=cookies.get('companyId');
    console.log(language);console.log(level)
    if(language.length>0 && level.length>0){
      axios.post(`http://localhost:8000/company-language/${companyId}`,{
        language,
        level,
        headers:{
          authorization:'Bearer '+token
        }
      })
    }else{
      console.log('length not equal')
    }
  }
  return (
    <div className="main-box">
      <div style={{ width: "750px" }} className="popup-box">
        <div>
          <h3 className="pop-video-heading">Add Languages</h3>
          <hr />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom:"150px"}}>
          <MuiDropDown setdata={company_action.setlanguage}  text="Language" languages={languages} ability={false}/>
          <MuiDropDown setdata={company_action.setlevel}  text="Proficiency Level" languages={languageType} ability={false} />
        </div>
        <div className="button-container">
          <Button className="cancel" content="Cancel" handle={handleClose} />
          <Button handle={savehandler} className="save" content="Save" />
        </div>
      </div>
    </div>
  );
}

export default LanguagePop;