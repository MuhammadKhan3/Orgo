import React,{useEffect} from "react";
import EmployeeBody from "../components/employee/EmployeeBody";
import EmployeeHeader from "../components/employee/EmployeeHeader";
import {useDispatch} from 'react-redux'
import "../pages/employee.css";
import FetchCompany from "../components/redux/thunk/FetchCompany";

function Employee() {
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

export default Employee;
