import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";
import {useDispatch,useSelector} from 'react-redux';
import {company_action} from '../redux/slice/companySlice';
import {Cookies} from 'react-cookie';
import axios from 'axios'

const cookies=new Cookies();
function HoursPopUp({ handleClose }) {
  const dispatch=useDispatch();
  const hourworking=useSelector(state=>state.companySlice.hourworking);
  console.log(hourworking);
  const savehandler=()=>{
    const token=cookies.get('token');
    const companyId=cookies.get('companyId');
    axios.post(`http://localhost:8000/company-workinghour/${companyId}`,{
      hourworking,
      headers:{
        authorization:"Bearer "+token
      }
    })
  }

  return (
    <div>
      <div className="main-box">
        <div className="popup-box">
          <div>
            <h3 className="pop-video-heading">Hours per week</h3>
            <hr />
          </div>
          <div className="pop-video-content">
            <p className="pop-input-label">
              Knowing how much you can work helps Upwork find the right jobs for
              you{" "}
            </p>
            <p style={{ marginTop: "20px" }}>I can currently work</p>
            <div>
              <input
                type="radio"
                id="more_30"
                name="work_hours"
                value={hourworking}
                checked={hourworking==="more than 30 hrs/week"}
                onClick={(e)=>{
                  dispatch(company_action.sethourswork("more than 30 hrs/week"))
                }}
              />
              <label className="radio-lable" for="more_30">
                more than 30 hrs/week
              </label>
              <br />
              <input
                type="radio"
                id="less_30"
                name="work_hours"
                value={hourworking}
                checked={hourworking==="less than 30 hrs/week"}
                onClick={(e)=>{
                  dispatch(company_action.sethourswork("less than 30 hrs/week"))
                }}
              />
              <label className="radio-lable" for="less_30">
                less than 30 hrs/week
              </label>
              <br />
              <input
                type="radio"
                id="as_need"
                name="work_hours"
                value={hourworking}
                checked={hourworking==="As needed - open to offers"}
                onClick={(e)=>{
                  dispatch(company_action.sethourswork("As needed - open to offers"))
                }}
              />
              <label className="radio-lable" for="as_need">
                As needed - open to offer
              </label>
              <br />
              <input type="radio" id="none" va name="work_hours" lue="None" 
                  value={hourworking}
                  checked={hourworking===""}
                  onClick={(e)=>{
                  dispatch(company_action.sethourswork(""))
              }}/>
              <label className="radio-lable" for="">
                none
              </label>
            </div>
          </div>
          <br />
          <hr />

          <div className="button-container">
            <Button className="cancel" content="Cancel" handle={handleClose} />
            <Button handle={savehandler} className="save" content="Save" />
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default HoursPopUp;
