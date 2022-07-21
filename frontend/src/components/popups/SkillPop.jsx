import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";
import { useState } from "react";
import {useSelector,useDispatch} from 'react-redux';
import {company_action} from '../redux/slice/companySlice';
import {Cookies} from 'react-cookie'
import axios from 'axios'
const cookies=new Cookies();

function SkillPop({ handleClose }) {
  const dispatch=useDispatch();
  const skills=useSelector(state=>state.companySlice.skills)
  
  const skillhandler=(e)=>{
    dispatch(company_action.setskills(e.target.value))
  }

  const savehandler=()=>{
    console.log('clik')
    const companyId=cookies.get('companyId');
    const token=cookies.get('token');
    axios.post(`http://localhost:8000/company-skill/${companyId}`,{
      skills,
      headers:{
        authorization:'Bearer '+token,
      }
    })
    .then((response)=>{
      console.log(response)
    })
  }

  return (
    <div className="main-box">
      <div className="popup-box">
        <div>
          <h3 className="pop-video-heading">Add your Skills</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label">Add your skills</p>
          <input
            style={{ margin: "10px 0 10px 0" }}
            className="pop-video-input"
            type="text"
            value={skills}
            onChange={skillhandler}
            placeholder="seprate with commas skill javascript,php"
          />
        </div>
        <br />
        <hr />

        <div className="button-container">
          <Button className="cancel" content="Cancel" handle={handleClose} />
          <Button handle={savehandler} className="save" content="Save" />
        </div>
      </div>
    </div>
  );
}

export default SkillPop;
