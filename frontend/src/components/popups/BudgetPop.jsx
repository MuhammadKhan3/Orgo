import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";
import MuiDropDown from "../muiComponents/MuiDropDown";
import {useSelector,useDispatch} from 'react-redux';
import {job_action} from '../redux/slice/jobSlice';

function BudgetPop({ handleClose }) {
  const min=useSelector(state=>state.jobSlice.min);
  const max=useSelector(state=>state.jobSlice.max);

  const dispatch=useDispatch();

  const maximumhandler=(e)=>{
    dispatch(job_action.setmaximum(e.target.value))
  }
  const minimumhandler=(e)=>{
    dispatch(job_action.setminimum(e.target.value))
  }

  return (
    <div className="main-box">
      <div style={{ width: "750px" }} className="popup-box">
        <div>
          <h3 className="pop-video-heading">Your Budget</h3>
          <hr />
        </div>
        <div
          style={{
            padding: "20px",
          }}
        >
          <p style={{fontWeight:"500"}}>Minimum</p>
          <input
            style={{ margin: "10px 0 10px 0" }}
            className="pop-video-input"
            type="text"
            value={min}
            onChange={minimumhandler}
            placeholder="Ex: 10.00 $/hr"
          />
        </div>
        <div
          style={{
            padding: "20px",
          }}
        >
          <p style={{fontWeight:"500"}}>Maximum</p>
          <input
            style={{ margin: "10px 0 10px 0" }}
            className="pop-video-input"
            type="text"
            value={max}
            placeholder="Ex: 25.00 $/hr"
            onChange={maximumhandler}
          />
        </div>
        <div className="button-container">
          <Button className="cancel" content="Cancel" handle={handleClose} />
          <Button className="save" content="Save" />
        </div>
      </div>
    </div>
  );
}

export default BudgetPop;
