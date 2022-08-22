import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import { company_action } from "../redux/slice/companySlice";
import {Cookies} from 'react-cookie';
const cookies=new Cookies();

function HourlyRatePop({ handleClose }) {
  const rate=useSelector(state=>state.companySlice.rate);
  const dispatch=useDispatch();
  const ratehandler=(e)=>{
    dispatch(company_action.setrate(e.target.value))
  }

  const savehandler=()=>{
    console.log('click')
    const companyId=cookies.get('companyId');
    const token=cookies.get('token');
    axios.post(`http://localhost:8000/company-rate/${companyId}`,{
      rate,
      headers:{
        authorization:"Bearer "+token
      }
    })
    .then((response)=>{
      console.log(response)
    }).catch(()=>{

    })
  }

  return (
    <div className="main-box">
      <div className="popup-box">
        <div>
          <h3 className="pop-video-heading">Change hourly rate</h3>
          <hr />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label" style={{ margin: "10px 0 10px 0" }}>
            Please note that your new hourly rate will only apply to new
            contracts.
          </p>
          <p style={{ margin: "10px 0 10px 0" }}>
            The Orgo Service Fee is 20% when you begin a contract with a new
            client. Once you bill over $500.00 with your client, the fee will be
            10%.
          </p>
          <input
            style={{ margin: "10px 0 10px 0" }}
            className="pop-video-input"
            value={rate}
            type="text"
            onChange={ratehandler}
            placeholder="Ex: 10.00 $/hr"
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

export default HourlyRatePop;
