import React, { useRef } from "react";
import Button from "../button/Button";
import "../popups/popup.css";
import {useSelector,useDispatch} from 'react-redux'
import {Cookies} from 'react-cookie';
import {company_action } from '../redux/slice/companySlice';
import axios from 'axios'
const cookies=new Cookies();

function CompContactPop({handleClose}) {
  const dispatch=useDispatch();
  const phone=useSelector(state=>state.companySlice.phone);
  const country=useSelector(state=>state.companySlice.country);
  const ownerName=useSelector(state=>state.companySlice.ownername);

  
  const phonehandler=(event)=>{
    const {value}=event.target;
    dispatch(company_action.setphone(value));
  }

  const countryhandler=(event)=>{
    const {value}=event.target;
    dispatch(company_action.setcountry(value));
  }

  const ownerhandler=(event)=>{
    const {value}=event.target;
    dispatch(company_action.setownername(value));
  }

  const savehandler=()=>{
    const employeeId=cookies.get('employeeId');
    const token=cookies.get('token');

    axios.post(`http://localhost:8000/company-contacts/${employeeId}`,{
      phone,
      country,
      ownerName,
      headers:{
        authorization:'Bearer '+token
      }
    }).then((response)=>{
      console.log(response)
    })
  }

  return (
    <div className="main-box">
      <div className="popup-box">
        <div>
          <h3 className="pop-video-heading">Company Contact</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label">Owner</p>
          <input
            className="pop-video-input"
            type="email"
            placeholder="abc123"
            value={ownerName}
            onChange={ownerhandler}
          />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label">Phone</p>
          <input
            className="pop-video-input"
            type="text"
            value={phone}
            onChange={phonehandler}

          />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label">Address</p>
          <input
            className="pop-video-input"
            type="address"
            placeholder="Country"
            value={country}
            onChange={countryhandler}
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

export default CompContactPop;
