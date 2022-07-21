import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";
import { fontSize, width } from "@mui/system";
import { MenuItem, Select, TextareaAutosize } from "@mui/material";
import {useDispatch,useSelector} from 'react-redux'
import {company_action} from '../redux/slice/companySlice'
import {Cookies} from 'react-cookie'
import axios from 'axios'
const cookies=new Cookies();
function EducationPop({ handleClose }) {
  const dispatch=useDispatch();
  const school=useSelector(state=>state.companySlice.school);
  const description=useSelector(state=>state.companySlice.sdescription);
  const degree=useSelector(state=>state.companySlice.degree);
  const degreelevel=useSelector(state=>state.companySlice.degreelevel);


  const schoolhandler=(e)=>{
    dispatch(company_action.setschool(e.target.value))
  }
  const descriptionhandler=(e)=>{
    dispatch(company_action.setsdescription(e.target.value))
  }
  
  const degreehandler=(e)=>{
    dispatch(company_action.setdegree(e.target.value))
  }
  const degreelevelhandler=(e)=>{
    dispatch(company_action.setdegreelevel(e.target.value))
  }

  const savehandler=()=>{
    const token=cookies.get('token');
    const companyId=cookies.get('companyId');
    axios.post(`http://localhost:8000/company-education/${companyId}`,{
      school,
      description,
      degree,
      degreelevel,
      headers:{
        authorization:'Bearer '+token,
      }
    })
  }
  return (
    <div className="main-box">
      <div className="popup-box-education">
        <div>
          <h3 className="pop-video-heading">Add Education</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label" style={{ fontWeight: "500" }}>
            School
          </p>
          <input
            className="pop-video-input"
            type="text"
            placeholder="Ex: Karachi University"
            value={school}
            onChange={schoolhandler}
          />
        </div>
        <div className="pop-video-content">
          <p
            className="pop-input-label"
            style={{ fontWeight: "500", marginBottom: "10px" }}
          >
            Degree (Optional){" "}
          </p>
          <Select sx={{ width: 525 }} value={degreelevel}  onChange={degreelevelhandler}>
            <MenuItem value='Associate Degree' sx={{ width: 525 }}>Associate Degree</MenuItem>
            <MenuItem value='Bachelor Degree' sx={{ width: 525 }}>Bachelor's Degree</MenuItem>
            <MenuItem value='Master Degree' sx={{ width: 525 }}>Master Degree</MenuItem>

          </Select>
        </div>

        <div className="pop-video-content">
          <p
            className="pop-input-label"
            style={{ fontWeight: "500", marginBottom: "10px" }}
          >
            Area of Study (Optional){" "}
          </p>
          <input
            className="pop-video-input"
            type="text"
            placeholder="Ex: Computer Science"
            onChange={degreehandler}
            value={degree}
          />
        </div>
        <div className="pop-video-content">
          <p
            className="pop-input-label"
            style={{ fontWeight: "500", marginBottom: "10px" }}
          >
            Description (Optional){" "}
          </p>
          <TextareaAutosize
            aria-label="Enter Description"
            placeholder="Empty"
            style={{ width: 525 , border:"1px solid #999", borderRadius:"3px" , padding:"10px"}}
            minRows={4}
            value={description}
            onChange={descriptionhandler}
          />
        </div>

        <br />
        <hr />
        <div className="button-container">
          <Button className="cancel" content="Cancel" handle={handleClose} />
          <Button className="save" handle={savehandler} content="Save" />
        </div>
      </div>
    </div>
  );
}

export default EducationPop;
