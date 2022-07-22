import React, { useRef } from "react";
import Button from "../button/Button";
import "../popups/popup.css";
import {useSelector,useDispatch} from 'react-redux'
import {company_action} from '../redux/slice/companySlice';
import axios from 'axios'
import {Cookies} from 'react-cookie'
const cookies=new Cookies();


function ClientAccountPop({ clientName, setClientName, handleClose }) {
  const dispatch=useDispatch();
  const name=useSelector(state=>state.companySlice.name);

  const namehandler = (e) => {
    const {value}=e.target;
    dispatch(company_action.setname(value))

  };

  const savehandler=(e)=>{
    const token=cookies.get('token');
    const userId=cookies.get('userId');
    axios.put(`http://localhost:8000/employe-name/${userId}`,{
      name,
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
          <h3 className="pop-video-heading">Account</h3>
          <hr />
        </div>
        {/* <div className="pop-video-content">
          <p className="pop-input-label">Username</p>
          <input
            className="pop-video-input"
            type="text"
            value="mosamanadeem"
            readOnly
          />
        </div> */}
        <div className="pop-video-content">
          <p className="pop-input-label">Email</p>
          <input
            className="pop-video-input"
            type="text"
            value="muhammadosama3556@gmail.com"
            readOnly
          />
        </div>
        <div className="pop-video-content">
          <p className="pop-input-label">Name</p>
          <input
            className="pop-video-input"
            type="name"
            value={name}
            onChange={namehandler}
            placeholder={name}
          />
        </div>
        <br />
        <hr />

        <div className="button-container">
          <Button  className="cancel" content="Cancel" handle={handleClose} />
          <Button handle={savehandler} className="save" content="Save" />
        </div>
      </div>
    </div>
  );
}

export default ClientAccountPop;
