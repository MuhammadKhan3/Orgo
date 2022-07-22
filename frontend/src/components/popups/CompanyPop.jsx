import React from "react";
import Button from "../button/Button";
import "../popups/popup.css";
import {useSelector,useDispatch} from 'react-redux';
import {Cookies} from 'react-cookie';
import { company_action } from "../redux/slice/companySlice";
import axios from 'axios'
const cookies=new Cookies();

function CompanyPop({ handleClose }) {
  const dispatch=useDispatch();
  const companyName=useSelector(state=>state.companySlice.companyname)
  const companyNamehandler=(e)=>{
    const {value}=e.target;
    dispatch(company_action.setcompanyname(value))
  }

  const savehandler=()=>{
    const employeeId=cookies.get('employeeId');
    const token=cookies.get('token');

    axios.post(`http://localhost:8000/company-details/${employeeId}`,{
      companyName,
      headers:{
        authorization:'Bearer '+token,
      }
    })
    .then((response)=>{
      console.log(response);
    })
  }

  return (
    <div className="main-box">
      <div className="popup-box">
        <div>
          <h3 className="pop-video-heading">Company</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label">Company Name</p>
          <input
            className="pop-video-input"
            type="name"
            placeholder="Muhammad Osama"
            value={companyName}
            onChange={companyNamehandler}
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

export default CompanyPop;
