import React from "react";
import Button from "../button/Button";
import { TextareaAutosize } from "@mui/material";
import "../popups/popup.css";
import {Cookies} from 'react-cookie'
import {useDispatch,useSelector} from 'react-redux';
import {company_action} from '../redux/slice/companySlice';
import axios from 'axios'
const cookies=new Cookies();

function TitlePop({ handleClose }) {
  const dispatch=useDispatch();
  const title=useSelector(state=>state.companySlice.title);
  const description=useSelector(state=>state.companySlice.description);

  const titlehandler=(e)=>{
    dispatch(company_action.settitle(e.target.value))
  }
  const descriptionhandler=(e)=>{
    dispatch(company_action.setdescription(e.target.value))

  }
  const savehandler=()=>{
    const companyId=cookies.get('companyId');
    const token=cookies.get('token')
    axios.post(`http://localhost:8000/company-information/${companyId}`,{
      title,
      description,
      headers:{
        authorization:'Bearer '+token
      }
    })
  }
  return (
    <div className="main-box">
      <div className="popup-box">
        <div>
          <h3 className="pop-video-heading">Edit your title</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label" style={{ margin: "10px 0 10px 0" }}>
            Your title{" "}
          </p>
          <p style={{ margin: "10px 0 10px 0" }}>
            Enter a single sentence description of your professional
            skills/experience (e.g. Expert Web Designer with Ajax experience)
          </p>
          <input
            style={{ margin: "10px 0 10px 0" }}
            className="pop-video-input"
            type="text"
            value={title}
            onChange={titlehandler}
            placeholder="Ex: Senior Mobile App developer"
          />
          <TextareaAutosize
            aria-label="Enter Description"
            placeholder="Enter Description"
            style={{
              width: 530,
              border: "1px solid #999",
              borderRadius: "3px",
              padding: "10px",
              fontSize:"0.9em",
            }}
            value={description}
            onChange={descriptionhandler}
            minRows={4}
          />
        </div>
        <br />
        <hr />

        <div className="button-container">
          <Button className="cancel" content="Cancel" handle={handleClose} />
          <Button className="save" content="Save" handle={savehandler} />
        </div>
      </div>
    </div>
  );
}

export default TitlePop;
