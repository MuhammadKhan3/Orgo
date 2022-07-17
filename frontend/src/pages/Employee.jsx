import React from "react";
import EmployeeBody from "../components/employee/EmployeeBody";
import EmployeeHeader from "../components/employee/EmployeeHeader";
import "../pages/employee.css";

function Employee() {
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
