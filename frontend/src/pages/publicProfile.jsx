import React,{useEffect} from "react";
import EmployeeBody from "../components/publicProfile/EmployeeBody";
import EmployeeHeader from "../components/publicProfile/EmployeeHeader";
import {useDispatch} from 'react-redux'
import "../pages/employee.css";
import FetchCompany from "../components/redux/thunk/FetchCompany";

function Publicprofile() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(FetchCompany());
  })
  return (
  <div>
    <div className="main-emp">
      <div className="header">
        <EmployeeHeader />
      </div>
      <div className="body-emp">
        <EmployeeBody />
      </div>
    </div>
  </div>
  );
}

export default Publicprofile;
