import React from "react";
import "../employee/employeeBody.css";
import EmployeeBodyLeft from "./EmployeeBodyLeft";
import EmployeeBodyRight from "./EmployeeBodyRight";

function EmployeeBody() {
  return (
    <div className="emp-body">
      <EmployeeBodyLeft/>
      <EmployeeBodyRight/>
    </div>
  );
}

export default EmployeeBody;
